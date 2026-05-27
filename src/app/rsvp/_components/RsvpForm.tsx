"use client";

import { skipToken } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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

const pillInputClass =
  "w-full min-w-0 flex-1 rounded-full border-2 border-wedding-ink bg-white px-5 py-3 font-serif text-wedding-ink placeholder:text-wedding-muted focus:outline-none focus:ring-2 focus:ring-wedding-green";

export default function RsvpForm() {
  const router = useRouter();
  const [inviteInput, setInviteInput] = useState("");
  const [lookupCode, setLookupCode] = useState<string | null>(null);
  const [guestRows, setGuestRows] = useState<GuestRow[]>([]);
  const [extraRows, setExtraRows] = useState<ExtraRow[]>([]);
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
    onSuccess: () => {
      router.push("/rsvp/complete");
    },
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
    "w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3 font-serif text-wedding-ink placeholder:text-wedding-muted focus:outline-none focus:ring-2 focus:ring-wedding-green";

  const showForm = lookup.isSuccess && lookup.data;
  const maxExtra = lookup.data?.maxExtraGuests ?? 0;
  const canAddExtra = maxExtra > 0 && extraRows.length < maxExtra;

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border-2 border-wedding-ink bg-white p-6 shadow-xl sm:p-8">
        <p className="font-script text-3xl text-wedding-ink">Invite code</p>
        <p className="mt-2 font-serif text-sm text-wedding-muted">
          Please enter the code from your invitation (letters and numbers only;
          spaces are ignored).
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <label htmlFor="inviteCode" className="sr-only">
            Invite code
          </label>
          <input
            id="inviteCode"
            type="text"
            autoComplete="off"
            value={inviteInput}
            onChange={(e) => setInviteInput(e.target.value)}
            className={pillInputClass}
            placeholder="e.g. LASTNAME - XXXX"
            disabled={submit.isPending}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLookup();
              }
            }}
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={submit.isPending || lookup.isFetching}
            className="shrink-0 rounded-full border-2 border-wedding-ink bg-white px-8 py-3 font-serif font-semibold text-wedding-ink transition hover:bg-wedding-cream disabled:opacity-50"
          >
            {lookup.isFetching ? "Checking…" : "Enter"}
          </button>
        </div>
      </div>

      {listError ? (
        <p
          className="rounded-xl border border-red-200 bg-white px-4 py-3 text-center text-sm text-red-700"
          role="alert"
        >
          {listError}
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleSubmitRsvp}
          className="space-y-8 rounded-[2rem] border-2 border-wedding-ink bg-white p-6 shadow-xl sm:p-8"
        >
          <div>
            <h2 className="font-script text-3xl text-wedding-ink">Your RSVP</h2>
            {lookup.data.displayName ? (
              <p className="mt-2 font-serif text-wedding-muted">
                {lookup.data.displayName}
              </p>
            ) : null}
          </div>

          <div className="space-y-6">
            {guestRows.map((row) => (
              <div
                key={row.id}
                className="space-y-4 rounded-2xl border-2 border-neutral-200 p-4"
              >
                <div>
                  <label
                    htmlFor={`name-${row.id}`}
                    className="mb-1 block text-sm font-medium text-wedding-ink"
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
                  <legend className="mb-2 block text-sm font-medium text-wedding-ink">
                    Attending?
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-wedding-ink">
                      <input
                        type="radio"
                        name={`attending-${row.id}`}
                        checked={row.isAttending === true}
                        onChange={() => updateRow(row.id, { isAttending: true })}
                        className="text-wedding-green focus:ring-wedding-green"
                      />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-wedding-ink">
                      <input
                        type="radio"
                        name={`attending-${row.id}`}
                        checked={row.isAttending === false}
                        onChange={() =>
                          updateRow(row.id, { isAttending: false })
                        }
                        className="text-wedding-green focus:ring-wedding-green"
                      />
                      No
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor={`allergy-${row.id}`}
                    className="mb-1 block text-sm font-medium text-wedding-ink"
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
            <div className="space-y-4 rounded-2xl border-2 border-dashed border-neutral-300 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-wedding-ink">
                    Additional guests
                  </h3>
                  <p className="text-sm text-wedding-muted">
                    Anyone joining you who isn&apos;t listed above — add up to{" "}
                    {maxExtra}. Include their name and any dietary needs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addExtraRow}
                  disabled={!canAddExtra || submit.isPending}
                  className="shrink-0 rounded-full border-2 border-wedding-green px-4 py-2 text-sm font-medium text-wedding-green transition hover:bg-wedding-green/10 disabled:opacity-50"
                >
                  Add guest
                </button>
              </div>

              {extraRows.length === 0 ? (
                <p className="text-sm text-wedding-muted">
                  No additional guests added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {extraRows.map((row, idx) => (
                    <div
                      key={row.localKey}
                      className="space-y-3 rounded-xl bg-wedding-cream/50 p-4 ring-1 ring-neutral-200"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-wedding-muted">
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
                          className="mb-1 block text-sm font-medium text-wedding-ink"
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
                          className="mb-1 block text-sm font-medium text-wedding-ink"
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
            className="w-full rounded-full bg-wedding-green px-8 py-3.5 font-serif font-semibold text-white transition hover:bg-wedding-green-hover disabled:opacity-50 sm:w-auto"
          >
            {submit.isPending ? "Saving…" : "Submit RSVP"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
