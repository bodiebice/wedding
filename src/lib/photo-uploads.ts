import "server-only";

import { env } from "~/env";

/** Flip on in Vercel when you're ready for guests to upload. */
export function arePhotoUploadsEnabled() {
  return env.PHOTO_UPLOADS_ENABLED === "true";
}
