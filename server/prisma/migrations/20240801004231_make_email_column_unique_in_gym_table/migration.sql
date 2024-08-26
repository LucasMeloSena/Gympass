/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `gyms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gyms_email_key" ON "gyms"("email");
