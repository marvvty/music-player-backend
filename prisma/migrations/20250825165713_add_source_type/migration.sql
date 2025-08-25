/*
  Warnings:

  - Added the required column `source_type` to the `music` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SourceType" AS ENUM ('UPLOAD', 'URL');

-- AlterTable
ALTER TABLE "public"."music" ADD COLUMN     "source_type" "public"."SourceType" NOT NULL;
