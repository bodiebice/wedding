import { PrismaClient } from "@prisma/client";

import { normalizeInviteCode } from "../src/lib/invite-code";

const prisma = new PrismaClient();

async function main() {
  const partyA = await prisma.inviteParty.upsert({
    where: { inviteCode: normalizeInviteCode("DEMO-SMITH") },
    update: { maxExtraGuests: 3 },
    create: {
      inviteCode: normalizeInviteCode("DEMO-SMITH"),
      displayName: "The Smith family",
      maxExtraGuests: 3,
      guests: {
        create: [
          {
            sortOrder: 0,
            displayName: "Alex Smith",
            isAttending: null,
            allergies: null,
          },
          {
            sortOrder: 1,
            displayName: "Jordan Smith",
            isAttending: null,
            allergies: null,
          },
        ],
      },
    },
  });

  const partyB = await prisma.inviteParty.upsert({
    where: { inviteCode: normalizeInviteCode("DEMO-JONES") },
    update: { maxExtraGuests: 2 },
    create: {
      inviteCode: normalizeInviteCode("DEMO-JONES"),
      displayName: "Jordan & Casey Jones",
      maxExtraGuests: 2,
      guests: {
        create: [
          {
            sortOrder: 0,
            displayName: "Jordan Jones",
            isAttending: null,
            allergies: null,
          },
          {
            sortOrder: 1,
            displayName: "Casey Jones",
            isAttending: null,
            allergies: null,
          },
        ],
      },
    },
  });

  console.log("Seed OK:", { partyA: partyA.id, partyB: partyB.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
