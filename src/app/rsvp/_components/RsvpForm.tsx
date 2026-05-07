"use client";

import { skipToken } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { normalizeInviteCode } from "~/lib/invite-code";
import { api, type RouterOutputs } from "~/trpc/react";

type RsvpLookupGuest = RouterOutputs["rsvp"]["lookup"]["guests"][number];
type RsvpLookupExtra = RouterOutputs["rsvp"]["lookup"]["extraGuests"][number];

type GuestRow = {
  id: string;
  displayName: string;
  isAttending: boolean | null;
  allergies: string;
};

type ExtraRow = {
  localKey: string;
  displayName: string;
  allergies: string;
};

export default function RsvpForm() {
  const [inviteInput, setInviteInput] = useState("");
  const [lookupCode, setLookupCode] = useState<string | null>(null);
  const [guestRows, setGuestRows] = useState<GuestRow[]>([]);
  const [extraRows, setExtraRows] = useState<ExtraRow[]>([]);
  const [submitDone, setSubmitDone] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const lookup = api.rsvp.lookup.useQuery(
    lookupCode ? { inviteCode: lookupCode } : skipToken,
    { retry: false },
  );

  useEffect(() => {
    if (lookup.data) {
      setGuestRows(
        lookup.data.guests.map((g: RsvpLookupGuest) => ({
          id: g.id,
          displayName: g.displayName,
          isAttending: g.isAttending,
          allergies: g.allergies ?? "",
        })),
      );
      setExtraRows(
        lookup.data.extraGuests.map((e: RsvpLookupExtra) => ({
          localKey: e.id,
          displayName: e.displayName,
          allergies: e.allergies ?? "",
        })),
      );
      setListError(null);
    }
  }, [lookup.data]);

  useEffect(() => {
    if (lookup.isError && lookup.error?.message) {
      setListError(lookup.error.message);
    }
  }, [lookup.isError, lookup.error]);

  const submit = api.rsvp.submit.useMutation({
    onSuccess: () => setSubmitDone(true),
  });

  const handleLookup = () => {
    const code = normalizeInviteCode(inviteInput);
    if (!code) {
      setListError("Please enter your invite code.");
      return;
    }
    setListError(null);
    setLookupCode(code);
  };

  const updateRow = (id: string, patch: Partial<GuestRow>) => {
    setGuestRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  };

  const updateExtraRow = (localKey: string, patch: Partial<ExtraRow>) => {
    setExtraRows((prev) =>
      prev.map((r) => (r.localKey === localKey ? { ...r, ...patch } : r)),
    );
  };

  const addExtraRow = () => {
    if (!lookup.data) return;
    if (extraRows.length >= lookup.data.maxExtraGuests) return;
    setExtraRows((prev) => [
      ...prev,
      {
        localKey: crypto.randomUUID(),
        displayName: "",
        allergies: "",
      },
    ]);
  };

  const removeExtraRow = (localKey: string) => {
    setExtraRows((prev) => prev.filter((r) => r.localKey !== localKey));
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode || !lookup.data) return;

    const unset = guestRows.filter((r) => r.isAttending === null);
    if (unset.length > 0) {
      setListError("Please mark whether each guest is attending.");
      return;
    }

    const extrasToSend = extraRows
      .map((r) => ({
        displayName: r.displayName.trim(),
        allergies: r.allergies.trim() ? r.allergies.trim() : null,
      }))
      .filter((r) => r.displayName.length > 0);

    if (extrasToSend.length > lookup.data.maxExtraGuests) {
      setListError(
        `You can add at most ${String(lookup.data.maxExtraGuests)} additional guest${lookup.data.maxExtraGuests === 1 ? "" : "s"} (each needs a name).`,
      );
      return;
    }

    setListError(null);

    submit.mutate({
      inviteCode: lookupCode,
      guests: guestRows.map((r) => ({
        id: r.id,
        displayName: r.displayName.trim(),
        isAttending: r.isAttending,
        allergies: r.allergies?.trim() ? r.allergies.trim() : null,
      })),
      extraGuests: extrasToSend,
    });
  };

  const inputClass =
    "w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] text-gray-900 placeholder-gray-500 border-transparent";

  if (submitDone) {
    return (
      <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 text-center">
        <p className="font-[var(--font-serif)] text-2xl text-white">
          Thank you!
        </p>
        <p className="mt-3 text-neutral-300">
          Your RSVP has been saved. We can&apos;t wait to celebrate with you.
        </p>
      </div>
    );
  }

  const showForm = lookup.isSuccess && lookup.data;
  const maxExtra = lookup.data?.maxExtraGuests ?? 0;
  const canAddExtra = maxExtra > 0 && extraRows.length < maxExtra;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#b54714] font-bold">
          Invite code
        </p>
        <p className="text-sm text-neutral-400 mb-4">
          Enter the code from your invitation (letters and numbers are fine;
          spaces are ignored).
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="inviteCode" className="sr-only">
              Invite code
            </label>
            <input
              id="inviteCode"
              type="text"
              autoComplete="off"
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              className={inputClass}
              placeholder="e.g. LASTNAME - XXXX"
              disabled={submit.isPending}
            />
          </div>
          <button
            type="button"
            onClick={handleLookup}
            disabled={submit.isPending || lookup.isFetching}
            className="rounded-xl bg-[#30703d] px-6 py-3 text-white font-semibold hover:bg-[#2a5f35] disabled:opacity-50"
          >
            {lookup.isFetching ? "Checking…" : "Continue"}
          </button>
        </div>
      </div>

      {listError ? (
        <p className="text-sm text-red-300 px-1" role="alert">
          {listError}
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleSubmitRsvp}
          className="rounded-2xl bg-white p-8 ring-1 ring-neutral-200 shadow-sm space-y-8"
        >
          <div>
            <h2 className="text-2xl text-gray-900 font-[var(--font-serif)]">
              Your RSVP
            </h2>
            {lookup.data.displayName ? (
              <p className="mt-1 text-gray-600">{lookup.data.displayName}</p>
            ) : null}
          </div>

          <div className="space-y-6">
            {guestRows.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-neutral-200 p-4 space-y-4"
              >
                <div>
                  <label
                    htmlFor={`name-${row.id}`}
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Guest name
                  </label>
                  <input
                    id={`name-${row.id}`}
                    type="text"
                    value={row.displayName}
                    onChange={(e) =>
                      updateRow(row.id, { displayName: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900 mb-2">
                    Attending?
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name={`attending-${row.id}`}
                        checked={row.isAttending === true}
                        onChange={() => updateRow(row.id, { isAttending: true })}
                        className="text-[#30703d] focus:ring-[#30703d]"
                      />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                      <input
                        type="radio"
                        name={`attending-${row.id}`}
                        checked={row.isAttending === false}
                        onChange={() =>
                          updateRow(row.id, { isAttending: false })
                        }
                        className="text-[#30703d] focus:ring-[#30703d]"
                      />
                      No
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor={`allergy-${row.id}`}
                    className="block text-sm font-medium text-gray-900 mb-1"
                  >
                    Allergies or dietary notes
                  </label>
                  <input
                    id={`allergy-${row.id}`}
                    type="text"
                    value={row.allergies}
                    onChange={(e) =>
                      updateRow(row.id, { allergies: e.target.value })
                    }
                    className={inputClass}
                    placeholder="None"
                  />
                </div>
              </div>
            ))}
          </div>

          {maxExtra > 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-300 p-4 space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Additional guests
                  </h3>
                  <p className="text-sm text-gray-600">
                    Anyone joining you who isn&apos;t listed above — add up to{" "}
                    {maxExtra}. Include their name and any dietary needs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addExtraRow}
                  disabled={!canAddExtra || submit.isPending}
                  className="shrink-0 rounded-lg border border-[#30703d] px-4 py-2 text-sm font-medium text-[#30703d] hover:bg-[#30703d]/5 disabled:opacity-50"
                >
                  Add guest
                </button>
              </div>

              {extraRows.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No additional guests added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {extraRows.map((row, idx) => (
                    <div
                      key={row.localKey}
                      className="rounded-lg bg-neutral-50 p-4 ring-1 ring-neutral-200 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                          Extra guest {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExtraRow(row.localKey)}
                          disabled={submit.isPending}
                          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                      <div>
                        <label
                          htmlFor={`extra-name-${row.localKey}`}
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Full name
                        </label>
                        <input
                          id={`extra-name-${row.localKey}`}
                          type="text"
                          value={row.displayName}
                          onChange={(e) =>
                            updateExtraRow(row.localKey, {
                              displayName: e.target.value,
                            })
                          }
                          className={inputClass}
                          placeholder="Required if bringing this guest"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`extra-diet-${row.localKey}`}
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Allergies or dietary notes
                        </label>
                        <input
                          id={`extra-diet-${row.localKey}`}
                          type="text"
                          value={row.allergies}
                          onChange={(e) =>
                            updateExtraRow(row.localKey, {
                              allergies: e.target.value,
                            })
                          }
                          className={inputClass}
                          placeholder="None"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {submit.error ? (
            <p className="text-sm text-red-600" role="alert">
              {submit.error.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submit.isPending}
            className="w-full sm:w-auto rounded-xl bg-[#30703d] px-8 py-3 text-white font-semibold hover:bg-[#2a5f35] disabled:opacity-50"
          >
            {submit.isPending ? "Saving…" : "Submit RSVP"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
