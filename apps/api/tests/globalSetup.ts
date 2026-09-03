import { afterAll } from 'bun:test';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

console.log('\n[Global Setup] Starting PostgreSQL container...');
const container = await new PostgreSqlContainer('postgres:17-alpine').start();
const databaseUrl = container.getConnectionUri();
process.env['DATABASE_URL'] = databaseUrl;
console.log('[Global Setup] PostgreSQL container started');

const client = postgres(databaseUrl, { max: 1 });
await migrate(drizzle(client), { migrationsFolder: './drizzle' });
await client.end();
console.log('[Global Setup] Migrations completed');

afterAll(async () => {
	if (process.env['DATABASE_URL']) {
		const { closeDatabase } = await import('../src/common/db');
		await closeDatabase();
	}

	console.log('\n[Global Teardown] Stopping PostgreSQL container...');
	await container.stop();
	console.log('[Global Teardown] PostgreSQL container stopped.');
});
