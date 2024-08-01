/*
  Warnings:

  - Added the required column `image` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "image" TEXT NOT NULL;
