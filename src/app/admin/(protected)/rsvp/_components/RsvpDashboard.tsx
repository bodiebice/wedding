"use client";

import { Fragment, useMemo, useState } from "react";

import { type RouterOutputs } from "~/trpc/react";
import { api } from "~/trpc/react";

type AdminRsvpData = RouterOutputs["admin"]["listRsvps"];
type PartyRow = AdminRsvpData["parties"][number];
type Filter = "all" | "pending" | "responded" | "partial";

const statusLabels: Record<PartyRow["status"], string> = {
  pending: "Not yet responded",
  partial: "Partially responded",
  responded: "Responded",
};

const statusClasses: Record<PartyRow["status"], string> = {
  pending: "bg-amber-100 text-amber-900",
  partial: "bg-orange-100 text-orange-900",
  responded: "bg-emerald-100 text-emerald-900",
};

const guestStatusLabels = {
  pending: "No response",
  attending: "Attending",
  declined: "Declined",
} as const;

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-wedding-ink/10 bg-white p-4 shadow-sm">
      <p className="text-sm text-wedding-muted">{label}</p>
      <p className="mt-1 font-serif text-3xl text-wedding-ink">{value}</p>
    </div>
  );
}

export default function RsvpDashboard({
  initialData,
}: {
  initialData: AdminRsvpData;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [expandedPartyId, setExpandedPartyId] = useState<string | null>(null);

  const query = api.admin.listRsvps.useQuery(undefined, {
    initialData,
    refetchInterval: 30_000,
  });

  const data = query.data ?? initialData;

  const filteredParties = useMemo(() => {
    const term = search.trim().toLowerCase();

    return data.parties.filter((party) => {
      if (filter !== "all" && party.status !== filter) return false;
      if (!term) return true;

      const haystack = [
        party.displayName ?? "",
        party.inviteCode,
        ...party.guests.map((guest) => guest.displayName),
        ...party.extraGuests.map((guest) => guest.displayName),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [data.parties, filter, search]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-wedding-accent">
            Admin
          </p>
          <h1 className="font-script text-4xl text-white sm:text-5xl">
            RSVP dashboard
          </h1>
          <p className="mt-2 font-serif text-sm text-white/80">
            Who has responded, who is attending, and who still needs a nudge.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total invitations" value={data.summary.totalParties} />
        <SummaryCard label="Responded" value={data.summary.respondedParties} />
        <SummaryCard label="Not yet responded" value={data.summary.pendingParties} />
        <SummaryCard label="Guests attending" value={data.summary.attendingGuests} />
      </div>

      <div className="rounded-[2rem] border-2 border-wedding-ink/10 bg-white p-6 text-wedding-ink shadow-xl sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "All"],
                ["pending", "Not responded"],
                ["responded", "Responded"],
                ["partial", "Partial"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === value
                    ? "bg-wedding-green text-white"
                    : "bg-wedding-cream text-wedding-ink hover:bg-wedding-cream/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="block w-full lg:max-w-sm">
            <span className="sr-only">Search invitations</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or invite code"
              className="w-full rounded-full border-2 border-neutral-200 px-4 py-2.5 font-serif text-sm text-wedding-ink placeholder:text-wedding-muted focus:outline-none focus:ring-2 focus:ring-wedding-green"
            />
          </label>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left font-serif text-sm">
            <thead>
              <tr className="border-b border-wedding-ink/10 text-wedding-muted">
                <th className="px-3 py-3 font-medium">Invitation</th>
                <th className="px-3 py-3 font-medium">Code</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Headcount</th>
                <th className="px-3 py-3 font-medium">Guests</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-8 text-center text-wedding-muted"
                  >
                    No invitations match your filters.
                  </td>
                </tr>
              ) : (
                filteredParties.map((party) => {
                  const isExpanded = expandedPartyId === party.id;
                  const guestSummary = [
                    ...party.guests.map((guest) => guest.displayName),
                    ...party.extraGuests.map(
                      (guest) => `${guest.displayName} (extra)`,
                    ),
                  ].join(", ");

                  return (
                    <Fragment key={party.id}>
                      <tr className="border-b border-wedding-ink/5 align-top">
                        <td className="px-3 py-4 font-medium text-wedding-ink">
                          {party.displayName ?? "Unnamed invitation"}
                        </td>
                        <td className="px-3 py-4 font-mono text-xs text-wedding-muted">
                          {party.inviteCode}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses[party.status]}`}
                          >
                            {statusLabels[party.status]}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-wedding-ink">
                          {party.attendingCount} attending
                          {party.declinedCount > 0
                            ? ` · ${party.declinedCount} declined`
                            : ""}
                        </td>
                        <td className="px-3 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedPartyId(isExpanded ? null : party.id)
                            }
                            className="text-left text-wedding-accent underline-offset-2 hover:underline"
                          >
                            {isExpanded ? "Hide details" : "View details"}
                          </button>
                          {!isExpanded ? (
                            <p className="mt-1 max-w-md text-xs text-wedding-muted">
                              {guestSummary || "No guests listed"}
                            </p>
                          ) : null}
                        </td>
                      </tr>
                      {isExpanded ? (
                        <tr className="bg-wedding-cream/40">
                          <td colSpan={5} className="px-3 py-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                              {party.guests.map((guest) => (
                                <div
                                  key={guest.id}
                                  className="rounded-xl border border-wedding-ink/10 bg-white p-4"
                                >
                                  <p className="font-medium text-wedding-ink">
                                    {guest.displayName}
                                  </p>
                                  <p className="mt-1 text-sm text-wedding-muted">
                                    {guestStatusLabels[guest.status]}
                                  </p>
                                  {guest.allergies ? (
                                    <p className="mt-2 text-xs text-wedding-muted">
                                      Dietary notes: {guest.allergies}
                                    </p>
                                  ) : null}
                                </div>
                              ))}
                              {party.extraGuests.map((guest) => (
                                <div
                                  key={guest.id}
                                  className="rounded-xl border border-wedding-ink/10 bg-white p-4"
                                >
                                  <p className="font-medium text-wedding-ink">
                                    {guest.displayName}
                                  </p>
                                  <p className="mt-1 text-sm text-wedding-muted">
                                    Attending (additional guest)
                                  </p>
                                  {guest.allergies ? (
                                    <p className="mt-2 text-xs text-wedding-muted">
                                      Dietary notes: {guest.allergies}
                                    </p>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-wedding-muted">
          Auto-refreshes every 30 seconds. Declined guests:{" "}
          {data.summary.declinedGuests}. Guests with no response yet:{" "}
          {data.summary.pendingGuests}.
        </p>
      </div>
    </div>
  );
}
