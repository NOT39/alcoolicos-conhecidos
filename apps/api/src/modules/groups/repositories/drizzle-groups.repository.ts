import { Group, groups } from "@/common/db/schema";
import { GroupsRepository } from "./groups.repository";
import { db } from "@/common/db";
import { desc } from "drizzle-orm";

export class DrizzleGroupsRepository implements GroupsRepository {
  list(): Promise<Group[]> {
    const result = db.select().from(groups).orderBy(desc(groups.createdAt))

    return result
  }
}
