import fs from "fs";
import path from "path";

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
if (!fs.existsSync(schemaPath)) {
  console.log("[Prepare Prisma] No schema.prisma found, skipping.");
  process.exit(0);
}

let schema = fs.readFileSync(schemaPath, "utf8");

const isPostgres =
  process.env.VERCEL === "1" ||
  Boolean(process.env.POSTGRES_PRISMA_URL) ||
  (process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith("postgres://") ||
      process.env.DATABASE_URL.startsWith("postgresql://")));

if (isPostgres) {
  console.log("[Prepare Prisma] Configuring schema for PostgreSQL (Vercel / Cloud)...");
  schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  if (process.env.POSTGRES_PRISMA_URL && !schema.includes("POSTGRES_PRISMA_URL")) {
    schema = schema.replace(
      /url\s*=\s*env\("DATABASE_URL"\)/g,
      'url       = env("POSTGRES_PRISMA_URL")\n  directUrl = env("POSTGRES_URL_NON_POOLING")'
    );
  }
} else {
  console.log("[Prepare Prisma] Configuring schema for SQLite (Local Dev)...");
  schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  schema = schema.replace(
    /url\s*=\s*env\("POSTGRES_PRISMA_URL"\)\s*\n\s*directUrl\s*=\s*env\("POSTGRES_URL_NON_POOLING"\)/g,
    'url      = env("DATABASE_URL")'
  );
}

fs.writeFileSync(schemaPath, schema, "utf8");
console.log("[Prepare Prisma] Schema synchronization complete.");
