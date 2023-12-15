import path from "path";
import fs from "fs";
import { query } from "../lib/db";

async function createExtensions() {
  await query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
}

async function createMigrationTable() {
  await query(
    `
    CREATE TABLE IF NOT EXISTS migrations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name varchar(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  );
}

async function createMigration(name: string) {
  await query("INSERT INTO migrations (name) VALUES ($1)", [name]);
}

async function getMigrations() {
  return await query("SELECT name FROM migrations");
}

function getMigrationFiles(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(`Error reading directory: ${error.message}`);
    return [];
  }
}

async function init() {
  await createExtensions();
  await createMigrationTable();
  const migrations = (await getMigrations())?.rows.map((migration) => migration.name);
  const migrationFiles = getMigrationFiles(`${__dirname}/migrations`).filter((file) => !migrations?.includes(file));
  migrationFiles.forEach(async (file) => {
    const moduleA = await import(`${__dirname}/migrations/${file}`);
    await moduleA.execute();
    await createMigration(file);
  });
}

init();
