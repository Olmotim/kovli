/*
  Warnings:

  - You are about to drop the column `fotoUrl` on the `Perro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Perro" DROP COLUMN "fotoUrl",
ADD COLUMN     "fotoPath" TEXT;
