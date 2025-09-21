import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { guests, addressSubmissions } from "~/server/db/schema";
import { eq } from "drizzle-orm";

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
    const guest = await ctx.db.insert(guests).values({
      familyName: input.familyName,
      email: input.email,
      phone: input.phone,
      address: input.address,
      city: input.city,
      state: input.state,
      zip: input.zip,
    });

    return guest; 
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const guests = await ctx.db.query.guests.findMany();
    return guests;
  }),

  rsvp: publicProcedure.input(z.object({
    id: z.string(),
    rsvpStatus: z.boolean(),
    partySize: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const guest = await ctx.db.update(guests).set({ rsvpStatus: input.rsvpStatus, partySize: input.partySize }).where(eq(guests.id, input.id));
    return guest;
  }),

  // Minimal address-only submissions
  addressCreate: publicProcedure.input(z.object({
    name: z.string().optional(),
    addressText: z.string().min(5),
  })).mutation(async ({ ctx, input }) => {
    const submission = await ctx.db.insert(addressSubmissions).values({
      name: input.name,
      addressText: input.addressText,
    });
    return submission;
  }),

  addressGetAll: publicProcedure.query(async ({ ctx }) => {
    const subs = await ctx.db.query.addressSubmissions.findMany();
    return subs;
  }),
});