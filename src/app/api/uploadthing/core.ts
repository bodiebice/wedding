import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

import { arePhotoUploadsEnabled } from "~/lib/photo-uploads";
import { db } from "~/server/db";

const f = createUploadthing();

export const ourFileRouter = {
  weddingPhoto: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 12,
    },
  })
    .input(
      z.object({
        uploaderName: z.string().trim().max(80).optional(),
      }),
    )
    .middleware(async ({ input }) => {
      if (!arePhotoUploadsEnabled()) {
        // UploadThingError is the supported rejection type for this middleware.
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError(
          "Photo uploads are not open yet. Check back closer to the wedding!",
        );
      }

      const uploaderName = input.uploaderName?.trim();
      return {
        uploaderName: uploaderName ?? null,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.photo.create({
        data: {
          key: file.key,
          url: file.ufsUrl,
          name: file.name,
          size: file.size,
          uploaderName: metadata.uploaderName,
        },
      });

      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
