-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'HEMBRA');

-- CreateTable
CREATE TABLE "Perro" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "raza" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),
    "sexo" "Sexo",
    "peso" DECIMAL(5,2),
    "notas" TEXT,
    "fotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Perro_usuarioId_idx" ON "Perro"("usuarioId");
