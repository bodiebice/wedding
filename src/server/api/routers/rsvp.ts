import type {
  InvitePartyExtraGuest,
  InvitePartyGuest,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { normalizeInviteCode } from "~/lib/invite-code";
import {
  isRsvpOpen,
  rsvpDeadlineLabel,
} from "~/lib/wedding-details";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const guestLineInput = z.object({
  id: z.string().uuid(),
  displayName: z.string().min(1),
  isAttending: z.boolean().nullable(),
  allergies: z.string().nullable(),
});

const extraGuestLineInput = z.object({
  displayName: z.string().min(1),
  allergies: z.string().nullable(),
});

export const rsvpRouter = createTRPCRouter({
  lookup: publicProcedure
    .input(z.object({ inviteCode: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const code = normalizeInviteCode(input.inviteCode);
      const party = await ctx.db.inviteParty.findUnique({
        where: { inviteCode: code },
        include: {
          guests: { orderBy: { sortOrder: "asc" } },
          extraGuests: { orderBy: { sortOrder: "asc" } },
        },
      });
      if (!party) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid invite code.",
        });
      }
      return {
        displayName: party.displayName,
        maxExtraGuests: party.maxExtraGuests,
        editsLocked: !isRsvpOpen(),
        guests: party.guests.map((g: InvitePartyGuest) => ({
          id: g.id,
          displayName: g.displayName,
          isAttending: g.isAttending,
          allergies: g.allergies,
        })),
        extraGuests: party.extraGuests.map((e: InvitePartyExtraGuest) => ({
          id: e.id,
          displayName: e.displayName,
          allergies: e.allergies,
        })),
      };
    }),

  submit: publicProcedure
    .input(
      z.object({
        inviteCode: z.string().min(1),
        guests: z.array(guestLineInput),
        extraGuests: z.array(extraGuestLineInput),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isRsvpOpen()) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `RSVPs closed on ${rsvpDeadlineLabel}. You can still view your response with your invite code.`,
        });
      }

      const code = normalizeInviteCode(input.inviteCode);
      const party = await ctx.db.inviteParty.findUnique({
        where: { inviteCode: code },
        select: { id: true, maxExtraGuests: true },
      });
      if (!party) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid invite code.",
        });
      }

      const extrasNormalized = input.extraGuests.map((r) => ({
        displayName: r.displayName.trim(),
        allergies:
          r.allergies?.trim() === "" ? null : (r.allergies?.trim() ?? null),
      }));

      if (extrasNormalized.length > party.maxExtraGuests) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `You can add at most ${String(party.maxExtraGuests)} guest${party.maxExtraGuests === 1 ? "" : "s"} beyond those named on your invitation.`,
        });
      }

      const ids = new Set(input.guests.map((g) => g.id));
      if (ids.size !== input.guests.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Duplicate guest rows.",
        });
      }

      await ctx.db.$transaction(async (tx) => {
        const db = tx as typeof ctx.db;

        const existingInTx = await db.invitePartyGuest.findMany({
          where: { partyId: party.id, id: { in: [...ids] } },
          select: { id: true },
        });
        if (existingInTx.length !== input.guests.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid guest data.",
          });
        }

        for (const row of input.guests) {
          await db.invitePartyGuest.update({
            where: { id: row.id },
            data: {
              displayName: row.displayName.trim(),
              isAttending: row.isAttending,
              allergies:
                row.allergies?.trim() === ""
                  ? null
                  : (row.allergies?.trim() ?? null),
            },
          });
        }

        await db.invitePartyExtraGuest.deleteMany({
          where: { partyId: party.id },
        });
        if (extrasNormalized.length > 0) {
          await db.invitePartyExtraGuest.createMany({
            data: extrasNormalized.map((r, i) => ({
              partyId: party.id,
              sortOrder: i,
              displayName: r.displayName,
              allergies: r.allergies,
            })),
          });
        }

        await db.rsvpSubmissionEvent.create({
          data: { partyId: party.id },
        });
      });

      return { ok: true as const };
    }),
});
