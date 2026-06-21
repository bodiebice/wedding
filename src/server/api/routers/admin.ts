import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export type PartyRsvpStatus = "pending" | "partial" | "responded";
export type GuestRsvpStatus = "pending" | "attending" | "declined";

function getPartyStatus(
  guests: { isAttending: boolean | null }[],
): PartyRsvpStatus {
  const answered = guests.filter((g) => g.isAttending !== null).length;

  if (answered === 0) return "pending";
  if (answered === guests.length) return "responded";
  return "partial";
}

function getGuestStatus(isAttending: boolean | null): GuestRsvpStatus {
  if (isAttending === true) return "attending";
  if (isAttending === false) return "declined";
  return "pending";
}

export const adminRouter = createTRPCRouter({
  listRsvps: adminProcedure.query(async ({ ctx }) => {
    const parties = await ctx.db.inviteParty.findMany({
      include: {
        guests: { orderBy: { sortOrder: "asc" } },
        extraGuests: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: [{ displayName: "asc" }, { inviteCode: "asc" }],
    });

    const rows = parties.map((party) => {
      const status = getPartyStatus(party.guests);
      const attendingCount =
        party.guests.filter((g) => g.isAttending === true).length +
        party.extraGuests.length;
      const declinedCount = party.guests.filter(
        (g) => g.isAttending === false,
      ).length;

      return {
        id: party.id,
        inviteCode: party.inviteCode,
        displayName: party.displayName,
        status,
        attendingCount,
        declinedCount,
        guestCount: party.guests.length,
        extraGuestCount: party.extraGuests.length,
        guests: party.guests.map((guest) => ({
          id: guest.id,
          displayName: guest.displayName,
          status: getGuestStatus(guest.isAttending),
          allergies: guest.allergies,
        })),
        extraGuests: party.extraGuests.map((guest) => ({
          id: guest.id,
          displayName: guest.displayName,
          status: "attending" as const,
          allergies: guest.allergies,
        })),
      };
    });

    const summary = {
      totalParties: rows.length,
      pendingParties: rows.filter((r) => r.status === "pending").length,
      respondedParties: rows.filter((r) => r.status === "responded").length,
      partialParties: rows.filter((r) => r.status === "partial").length,
      attendingGuests: rows.reduce((sum, r) => sum + r.attendingCount, 0),
      declinedGuests: rows.reduce((sum, r) => sum + r.declinedCount, 0),
      pendingGuests: rows.reduce(
        (sum, r) =>
          sum + r.guests.filter((g) => g.status === "pending").length,
        0,
      ),
    };

    return { summary, parties: rows };
  }),
});
