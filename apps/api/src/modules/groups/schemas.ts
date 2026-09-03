import { groups } from '@/common/db/schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-typebox';
import { t } from 'elysia';

/**
 * API validation schemas using drizzle-typebox.
 * When you add/remove fields in Drizzle, they auto-include here.
 *
 * @see https://elysiajs.com/integrations/drizzle
 */

export const createGroupSchema = createInsertSchema(groups, {
	name: t.String({ minLength: 1, maxLength: 255 }),
	description: t.Optional(t.String({ minLength: 1, maxLength: 2000 })),
});

export const updateGroupSchema = createUpdateSchema(groups, {
	name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
	description: t.Optional(t.String({ minLength: 1, maxLength: 200 })),
});
