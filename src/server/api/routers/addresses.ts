import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const addressesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        addressText: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.addressSubmission.create({
        data: { name: input.name, addressText: input.addressText },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.addressSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
