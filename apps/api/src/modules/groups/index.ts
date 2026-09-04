import { withAuth } from '@common/middleware/auth-guard';
import { Elysia } from 'elysia';
import { makeGroupsService } from './factories/makeGroupsService';

/**
 * Groups CRUD Module
 *
 * Demonstrates public/protected routes with ownership validation.
 */
export const groupsModule = withAuth(new Elysia({ prefix: '/api/groups' }))
  .decorate("groupsService", makeGroupsService())
  // GET /api/groups - Public (anyone can view)
  .get(
    '/',
    async ({ groupsService }) => {
      const groups = await groupsService.getAll()
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
