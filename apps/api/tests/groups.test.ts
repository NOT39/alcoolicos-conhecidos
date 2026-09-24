import { describe, expect, it } from 'bun:test';
import { createApp } from '../src/app';
import type { Group } from '../src/common/db/schema';
import { parseJson } from './helpers/json';

type GroupsListBody = {
	data: Group[];
	total: number;
};

describe('Groups Module', () => {
	const app = createApp();

	describe('Public Routes', () => {
		it('GET /api/groups returns list of groups', async () => {
			const response = await app.handle(new Request('http://localhost/api/groups'));
			const body = await parseJson<GroupsListBody>(response);

			expect(response.status).toBe(200);
			expect(body).toHaveProperty('data');
			expect(body).toHaveProperty('total');
			expect(Array.isArray(body.data)).toBe(true);
			expect(typeof body.total).toBe('number');
			expect(body.total).toBe(body.data.length);
		});
	});
});
