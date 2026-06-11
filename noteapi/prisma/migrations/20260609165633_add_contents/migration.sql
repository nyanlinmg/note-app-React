/*
  Warnings:

  - Added the required column `contents` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "contents" TEXT NOT NULL;
