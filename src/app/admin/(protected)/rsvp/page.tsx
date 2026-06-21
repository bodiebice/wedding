import { type Metadata } from "next";

import RsvpDashboard from "./_components/RsvpDashboard";
import { HydrateClient, api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "RSVP Dashboard | Bodie & Abby's Wedding",
  robots: { index: false, follow: false },
};

export default async function AdminRsvpPage() {
  const data = await api.admin.listRsvps();

  return (
    <HydrateClient>
      <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <RsvpDashboard initialData={data} />
        </div>
      </main>
    </HydrateClient>
  );
}
