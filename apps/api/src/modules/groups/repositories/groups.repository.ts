import { Group } from "@/common/db/schema";

export interface GroupsRepository {
  list(): Promise<Group[]>
}
