import { db } from '@common/db';
import { groups } from '@common/db/schema';
import { desc } from 'drizzle-orm';

export async function getAllGroups() {
  return await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      ownerId: groups.ownerId,
      createdAt: groups.createdAt,
      updatedAt: groups.updatedAt,
    })
    .from(groups)
    .orderBy(desc(groups.createdAt));
}
