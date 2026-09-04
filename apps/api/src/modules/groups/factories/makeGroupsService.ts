import { DrizzleGroupsRepository } from "../repositories/drizzle-groups.repository";
import { GroupsService } from "../service";

export function makeGroupsService() {
  const groupsRepository = new DrizzleGroupsRepository()
  const service = new GroupsService(groupsRepository)

  return service
}
