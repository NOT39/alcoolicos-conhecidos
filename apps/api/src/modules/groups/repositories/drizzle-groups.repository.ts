import { db } from '@/common/db';
import { type Group, groups } from '@/common/db/schema';
import { desc } from 'drizzle-orm';
import type { GroupsRepository } from './groups.repository';

export class DrizzleGroupsRepository implements GroupsRepository {
	list(): Promise<Group[]> {
		const result = db.select().from(groups).orderBy(desc(groups.createdAt));

		return result;
	}
}
