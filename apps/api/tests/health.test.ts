import { describe, expect, it } from 'bun:test';
import { treaty } from '@elysia/eden';
import { createApp } from '../src/app';

describe('Health Module', () => {
	const app = createApp();
	const api = treaty(app);

	it('GET /health returns ok status', async () => {
		const { status, data: body } = await api.health.get();

		expect(status).toBe(200);
		expect(body?.status).toBe('ok');
		expect(body?.database).toBe('healthy');
		expect(body).toHaveProperty('timestamp');
		expect(body).toHaveProperty('uptime');
		expect(body).toHaveProperty('responseTime');
	});
});
