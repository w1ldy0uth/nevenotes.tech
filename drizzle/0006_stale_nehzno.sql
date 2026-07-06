ALTER TABLE "notes" ADD COLUMN "title_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "title_ru" text;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "body_md_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "body_md_ru" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "title_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "title_ru" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "excerpt_en" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "excerpt_ru" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "body_md_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "body_md_ru" text;