// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator, integer, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
/*
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const table = pgTableCreator((name) => `wedding_${name}`);

export const guests = table(
  "guests",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    familyName: varchar("family_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull(),
    zip: varchar("zip", { length: 255 }).notNull(),
    partySize: integer("party_size"),
    rsvpStatus: boolean("rsvp_status").default(false),
  }
);

export const addressSubmissions = table(
  "address_submissions",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }),
    addressText: text("address_text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  }
);


