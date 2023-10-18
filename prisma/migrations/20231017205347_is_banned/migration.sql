/*
  Warnings:

  - You are about to drop the column `isBan` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isBan",
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;
