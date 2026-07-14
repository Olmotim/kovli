import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Singleton: sin esto, cada recarge en caliente de Next.js en desarrollo
// crearía una conexión nueva a la base de datos hasta agotar el límite
// (problema conocido de Prisma + Next.js, no un bug nuestro).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
