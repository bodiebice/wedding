// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql,} from "drizzle-orm";
import { sqliteTableCreator, 
  int,
  text,
  uniqueIndex
} from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";
/*
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const table = sqliteTableCreator((name) => `wedding_${name}`);

export const guests = table(
  "guests",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    familyName: text("family_name", { length: 255 }).notNull(),
    email: text("email", { length: 255 }).notNull(),
    phone: text("phone", { length: 255 }).notNull(),
    address: text("address", { length: 255 }).notNull(),
    city: text("city", { length: 255 }).notNull(),
    state: text("state", { length: 255 }).notNull(),
    zip: text("zip", { length: 255 }).notNull(),
    partySize: int("party_size"),
    rsvpStatus: int("rsvp_status", {mode: "boolean"}).default(false),
  }
);


