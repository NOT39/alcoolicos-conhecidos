import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export const swaggerConfig = new Elysia().use(swagger({
  path: '/docs',
  documentation: {
    info: {
      title: 'Elysia Production API',
      version: '1.0.0',
      description:
        'Production-ready Elysia.js backend with auth, database, and best practices.\n\n' +
        'Full Better Auth documentation: https://better-auth.com',
    },
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      {
        name: 'Auth',
        description: 'Authentication endpoints (Better Auth)',
      },
      {
        name: 'Groups',
        description: 'Groups CRUD endpoints (reference implementation)',
      },
    ],
  },
  scalarConfig: {
    theme: 'purple',
  },
})
)
