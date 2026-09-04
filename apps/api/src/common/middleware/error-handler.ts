import Elysia from 'elysia';
import { env } from '../config/env';
import { appLogger } from '../logger';

export const errorHandler = new Elysia().onError({ as: 'global' }, ({ code, error, set }) => {
	const errorMessage = error instanceof Error ? error.message : String(error);

	appLogger.error({
		code,
		error: errorMessage,
		stack: env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
	});

	if (code === 'NOT_FOUND') {
		set.status = 404;
		return { error: 'Route not found' };
	}

	if (code === 'VALIDATION') {
		set.status = 400;

		let parsedMessage = errorMessage;
		try {
			if (typeof errorMessage === 'string' && errorMessage.startsWith('{')) {
				parsedMessage = JSON.parse(errorMessage);
			}
		} catch {}

		return {
			error: 'Validation error',
			message: parsedMessage,
		};
	}

	set.status = 500;
	return {
		error: 'Internal server error',
		message: env.NODE_ENV === 'development' ? errorMessage : undefined,
	};
});
