/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "last_name" VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
