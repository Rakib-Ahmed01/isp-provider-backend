/*
  Warnings:

  - Added the required column `speed` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "speed" INTEGER NOT NULL;
