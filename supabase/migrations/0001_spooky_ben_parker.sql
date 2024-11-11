ALTER TABLE "vote" ADD COLUMN "ip_address" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "age";