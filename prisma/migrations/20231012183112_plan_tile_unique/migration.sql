/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `plans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "plans_title_key" ON "plans"("title");
