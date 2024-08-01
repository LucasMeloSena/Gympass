/*
  Warnings:

  - Added the required column `city` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_adress` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "number_adress" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
