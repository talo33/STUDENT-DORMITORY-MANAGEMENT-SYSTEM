class ApiError extends Error {
	constructor(
		statusCode,
		message,
		errorEnum,
		isOperational = true,
		stack = ""
	) {
		super();
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.message = message;
		this.errorEnum = errorEnum;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
export default ApiError;
