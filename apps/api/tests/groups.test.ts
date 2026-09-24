import { describe, expect, it } from 'bun:test';
import { createApp } from '../src/app';
import { treaty } from '@elysia/eden'

describe('Groups Module', () => {
  const app = createApp();
  const api = treaty(app);

  describe('Public Routes', () => {
    it('GET /api/groups returns list of groups', async () => {
      const { data: body, status } = await api.api.groups.get()

      expect(status).toBe(200);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('total');
      expect(Array.isArray(body?.data)).toBe(true);
      expect(typeof body?.total).toBe('number');
      expect(body?.total).toBe(body?.data.length);
    });
  });
});
