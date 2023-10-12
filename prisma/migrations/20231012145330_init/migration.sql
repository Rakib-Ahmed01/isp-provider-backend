/*
  Warnings:

  - The values [customer] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `contactNo` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews_and_ratings` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin', 'super_admin');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_bookId_fkey";

-- DropForeignKey
ALTER TABLE "reviews_and_ratings" DROP CONSTRAINT "reviews_and_ratings_userId_fkey";

-- DropIndex
DROP INDEX "users_contactNo_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contactNo",
ALTER COLUMN "role" SET DEFAULT 'user';

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "books";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "reviews_and_ratings";

-- DropEnum
DROP TYPE "Status";
