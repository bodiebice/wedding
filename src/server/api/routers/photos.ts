import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const photosRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.photo.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        url: true,
        name: true,
        uploaderName: true,
        createdAt: true,
      },
    });
  }),
});
