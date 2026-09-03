import { withAuth } from '@common/middleware/auth-guard';
import { Elysia } from 'elysia';
import * as service from './service';

/**
 * Groups CRUD Module
 *
 * Demonstrates public/protected routes with ownership validation.
 */
export const groupsModule = withAuth(new Elysia({ prefix: '/api/groups' }))
	// GET /api/groups - Public (anyone can view)
	.get(
		'/',
		async () => {
			const groups = await service.getAllGroups();
			return {
				data: groups,
				total: groups.length,
			};
		},
		{
			detail: {
				tags: ['Groups'],
				summary: 'Get all groups',
				description: 'Public endpoint - returns all groups with author info',
			},
		},
	);
