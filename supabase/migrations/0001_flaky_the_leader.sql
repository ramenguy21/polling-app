ALTER TABLE "vote" DROP CONSTRAINT "vote_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "vote" DROP COLUMN IF EXISTS "user_id";