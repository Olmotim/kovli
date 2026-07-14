-- CreateTable
CREATE TABLE "Tarea" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "perroId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TareaCompletada" (
    "id" TEXT NOT NULL,
    "tareaId" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TareaCompletada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Tarea_usuarioId_idx" ON "Tarea"("usuarioId");

-- CreateIndex
CREATE INDEX "Tarea_perroId_idx" ON "Tarea"("perroId");

-- CreateIndex
CREATE UNIQUE INDEX "TareaCompletada_tareaId_fecha_key" ON "TareaCompletada"("tareaId", "fecha");

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_perroId_fkey" FOREIGN KEY ("perroId") REFERENCES "Perro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TareaCompletada" ADD CONSTRAINT "TareaCompletada_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
