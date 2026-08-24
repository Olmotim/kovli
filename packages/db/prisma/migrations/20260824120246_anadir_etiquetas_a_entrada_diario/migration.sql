-- AlterTable
ALTER TABLE "EntradaDiario" ADD COLUMN     "etiquetas" TEXT[] DEFAULT ARRAY[]::TEXT[];
