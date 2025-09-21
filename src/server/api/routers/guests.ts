import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Prisma } from "@prisma/client";

export const guestsRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({
    familyName: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const guest = await ctx.db.guest.create({
      data: {
        familyName: input.familyName,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        state: input.state,
        zip: input.zip,
      },
    });
    return guest;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const all = await ctx.db.guest.findMany({ orderBy: { familyName: "asc" } });
    return all;
  }),

  rsvp: publicProcedure.input(z.object({
    id: z.string(),
    rsvpStatus: z.boolean(),
    partySize: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const updated = await ctx.db.guest.update({
      where: { id: input.id },
      data: { rsvpStatus: input.rsvpStatus, partySize: input.partySize },
    });
    return updated;
  }),

  // Minimal address-only submissions
  addressCreate: publicProcedure.input(z.object({
    name: z.string().optional(),
    addressText: z.string().min(5),
  })).mutation(async ({ ctx, input }) => {
    const submission = await ctx.db.addressSubmission.create({
      data: { name: input.name, addressText: input.addressText },
    });
    return submission;
  }),

  addressGetAll: publicProcedure.query(async ({ ctx }) => {
    const subs = await ctx.db.addressSubmission.findMany({ orderBy: { createdAt: "desc" } });
    return subs;
  }),
});