ALTER TABLE "projects" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "description_ru" text;--> statement-breakpoint
UPDATE "projects" SET "description_en" = "description" WHERE "description" IS NOT NULL;