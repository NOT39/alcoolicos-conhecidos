import { env } from '@common/config/env';
import { cors } from '@elysiajs/cors';
import { authModule } from '@modules/auth';
import { healthModule } from '@modules/health';
import { Elysia } from 'elysia';
import { appLogger } from './common/logger';
import { authRateLimit, globalRateLimit } from './common/middleware/rate-limiter';
import { requestLogger } from './common/middleware/request-logger';
import { groupsModule } from './modules/groups';
import { swaggerConfig } from './common/plugins/swagger';
import { errorHandler } from './common/middleware/error-handler';

/**
 * Application composition root.
 *
 * Registers global middleware, OpenAPI/Scalar documentation,
 * error handling, and feature modules.
 * * @see https://elysiajs.com/concepts/plugin.html
 */
export const createApp = () => {
  const app = new Elysia()
    .use(requestLogger)
    .use(globalRateLimit)
    .use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
      }),
    )
    // ---  API Documentation (open at /docs) ---
    .use(swaggerConfig)

    .use(errorHandler)

    // Root endpoint - API info
    .get('/', () => ({
      name: 'Elysia Production API',
      version: '1.0.0',
      docs: '/docs',
      health: '/health',
    }))

    // Feature modules
    .use(healthModule)
    .use(groupsModule);

  if (env.ENABLE_AUTH) {
    app.use(authRateLimit);
    app.use(authModule);
    appLogger.info('[AUTH] Authentication module enabled');
  } else {
    appLogger.info('[AUTH] Authentication disabled (ENABLE_AUTH=false)');
  }

  return app;
};
