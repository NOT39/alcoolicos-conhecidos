import type { GroupsRepository } from './repositories/groups.repository';

export class GroupsService {
	constructor(private groupsRepository: GroupsRepository) {}

	async getAll() {
		return this.groupsRepository.list();
	}
}
