-- CreateTable
CREATE TABLE "EntradaDiario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "perroId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "texto" TEXT,
    "fotos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntradaDiario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EntradaDiario_usuarioId_idx" ON "EntradaDiario"("usuarioId");

-- CreateIndex
CREATE INDEX "EntradaDiario_perroId_idx" ON "EntradaDiario"("perroId");

-- AddForeignKey
ALTER TABLE "EntradaDiario" ADD CONSTRAINT "EntradaDiario_perroId_fkey" FOREIGN KEY ("perroId") REFERENCES "Perro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
