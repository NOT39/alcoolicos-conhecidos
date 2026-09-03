import { db } from '@common/db';
import { user } from '@common/db/schema';
import { appLogger } from '@common/logger';

/**
 * Database Seed Script (OPTIONAL)
 * Populates the database with sample data for development.
 * * Usage: bun run db:seed
 *
 * WARNING: Only run this in development environments.
 */

async function seed() {
	appLogger.info('[SEED] Starting database seeding...');

	try {
		// Create sample users
		appLogger.info('[SEED] Creating sample users...');
		const [user1, user2] = await db
			.insert(user)
			.values([
				{
					id: 'sample-user-1',
					name: 'Alice Demo',
					email: 'alice@example.com',
					emailVerified: true,
				},
				{
					id: 'sample-user-2',
					name: 'Bob Sample',
					email: 'bob@example.com',
					emailVerified: true,
				},
			])
			.onConflictDoNothing()
			.returning();

		if (user1 && user2) {
			appLogger.info(`[SEED] Created users: ${user1.email}, ${user2.email}`);
		} else {
			appLogger.info('[SEED] Sample data already exists');
		}

		appLogger.info('[SEED] Database seeding completed successfully');
	} catch (error) {
		appLogger.error({ error }, '[SEED] Seeding failed');
		throw error;
	} finally {
		process.exit(0);
	}
}

seed();
