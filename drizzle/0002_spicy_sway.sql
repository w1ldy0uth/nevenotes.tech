CREATE TYPE "public"."resume_language" AS ENUM('en', 'ru');--> statement-breakpoint
CREATE TABLE "resumes" (
	"language" "resume_language" PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"filename" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
