/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "createdAt",
ADD COLUMN     "diagnostic" TEXT,
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "recommandation" TEXT;
