import { auth } from '@common/config/auth';
import { Elysia } from 'elysia';

/**
 * Derives user and session from Better Auth
 * Call this in your module before defining routes
 */
export const withAuth = new Elysia()
  .derive(async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return {
      user: session?.user ?? null,
      session: session?.session ?? null,
    };
  })
  .macro({
    auth(enabled: boolean) {
      if (!enabled) return;

      return {
        beforeHandle: async ({ user, set }: any) => {
          if (!user) {
            set.status = 401;
            return {
              error: 'Unauthorized',
              message: 'Please login first',
            };
          }
        },
      };
    },
  });
