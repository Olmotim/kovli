import path from "node:path";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Las variables de entorno viven en apps/web/.env.local (única fuente,
// para no duplicarlas también aquí y que se desincronicen).
config({ path: path.resolve(__dirname, "../../apps/web/.env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Conexión directa (sin pooler): la usan los comandos de Prisma CLI
    // (migrate, studio, generate). El cliente en tiempo de ejecución usa
    // DATABASE_URL (con pooler) en src/client.ts, no esta.
    url: env("DIRECT_URL"),
  },
});
