import httpStatus from 'http-status';
import { ValidationError as ExpressValidationError } from 'express-validation';
import { env } from '@/config/constant.config';
import APIError from '@/utils/APIError';

const handler = (err, req, res, next) => {
	const response = {
		code: err.status,
		message: err.message || httpStatus[err.status],
		errors: err.errors,
		stack: err.stack
	};

	if (env !== 'development') {
		delete response.stack;
	}

	res.status(err.status);
	res.json(response);
};

const converter = (err, req, res, next) => {
	let convertedError = err;

	if (err instanceof ExpressValidationError) {
		convertedError = new APIError({
			message: 'Validation Error',
			errors: err.details,
			status: err.statusCode
		});
	} else if (!(err instanceof APIError)) {
		convertedError = new APIError({
			message: err.message,
			status: err.status,
			stack: err.stack
		});
	}

	return handler(convertedError, req, res, next);
};

const notFound = (req, res, next) => {
	const err = new APIError({
		message: 'Not found',
		status: httpStatus.NOT_FOUND
	});
	return handler(err, req, res, next);
};

export default {
	handler,
	converter,
	notFound
};
