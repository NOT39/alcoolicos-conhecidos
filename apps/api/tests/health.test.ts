import { describe, expect, it } from 'bun:test';
import { createApp } from '../src/app';
import { parseJson } from './helpers/json';

type HealthResponse = {
	status: string;
	database: string;
	timestamp: string;
	uptime: number;
	responseTime: string;
};

describe('Health Module', () => {
	const app = createApp();
	it('GET /health returns ok status', async () => {
		const response = await app.handle(new Request('http://localhost/health'));
		const body = await parseJson<HealthResponse>(response);

		expect(response.status).toBe(200);
		expect(body.status).toBe('ok');
		expect(body.database).toBe('healthy');
		expect(body).toHaveProperty('timestamp');
		expect(body).toHaveProperty('uptime');
		expect(body).toHaveProperty('responseTime');
	});
});
