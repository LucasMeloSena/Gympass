/*
  Warnings:

  - You are about to drop the column `addition` on the `gyms` table. All the data in the column will be lost.
  - You are about to drop the column `number_adress` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `adress_number` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "addition",
DROP COLUMN "number_adress",
ADD COLUMN     "adress_addition" TEXT,
ADD COLUMN     "adress_number" TEXT NOT NULL;
