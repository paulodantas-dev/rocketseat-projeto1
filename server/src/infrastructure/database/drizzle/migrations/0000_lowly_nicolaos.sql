CREATE TABLE "exports" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"created_at" varchar(255) NOT NULL,
	"updated_at" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"long_url" varchar(2048) NOT NULL,
	"shortened_link" varchar(255) NOT NULL,
	"clicks" integer NOT NULL,
	"created_at" varchar(255) NOT NULL,
	"updated_at" varchar(255) NOT NULL
);
