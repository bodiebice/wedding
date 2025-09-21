CREATE TABLE "wedding_address_submissions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"address_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wedding_guests" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"family_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"party_size" integer,
	"rsvp_status" boolean DEFAULT false
);
