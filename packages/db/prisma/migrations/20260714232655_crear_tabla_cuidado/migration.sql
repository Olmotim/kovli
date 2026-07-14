-- CreateEnum
CREATE TYPE "TipoCuidado" AS ENUM ('VACUNA', 'DESPARASITACION', 'REVISION', 'OTRO');

-- CreateTable
CREATE TABLE "Cuidado" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "perroId" TEXT NOT NULL,
    "tipo" "TipoCuidado" NOT NULL,
    "tipoLibre" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuidado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cuidado_usuarioId_idx" ON "Cuidado"("usuarioId");

-- CreateIndex
CREATE INDEX "Cuidado_perroId_idx" ON "Cuidado"("perroId");

-- AddForeignKey
ALTER TABLE "Cuidado" ADD CONSTRAINT "Cuidado_perroId_fkey" FOREIGN KEY ("perroId") REFERENCES "Perro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
