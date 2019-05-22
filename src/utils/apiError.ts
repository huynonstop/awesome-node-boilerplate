import httpStatus from 'http-status'

/**
 * @swagger
 *
 * definitions:
 *   ErrorCode:
 *     type: integer
 *     enum:
 *       - 1
 *       - 2
 *       - 3
 *       - 4
 *     description: |
 *      * 1 - passwordNotCorrect
 *      * 2 - emailNotCorrect
 *      * 3 - emailNotFound
 *      * 4 - resetTokenInvalid
 */
export enum ErrorCode {
	passwordNotCorrect = 1,
	emailNotCorrect = 2,
	emailNotFound = 3,
	resetTokenInvalid = 4,
}

/**
 * Api Error
 */
export class ApiError extends Error {
	errorCode?: ErrorCode
	status?: number

	constructor(message: string, status?: number, errorCode?: ErrorCode) {
		super(message)
		this.status = status
		this.errorCode = errorCode
	}
}

/**
 * Throw Bad request (400)
 *
 * @param message
 * @param errorCode
 */
export const badRequest = (
	message = 'Invalid params',
	errorCode?: ErrorCode,
) => {
	return new ApiError(message, httpStatus.BAD_REQUEST, errorCode)
}

/**
 * Throw Unauthorized (401)
 *
 * @param message
 * @param errorCode
 */
export const unauthorized = (
	message = 'Unauthorized',
	errorCode?: ErrorCode,
) => {
	return new ApiError(message, httpStatus.UNAUTHORIZED, errorCode)
}

/**
 * Throw Not found (404)
 *
 * @param message
 * @param errorCode
 */
export const notFound = (message = 'Not found', errorCode?: ErrorCode) => {
	return new ApiError(message, httpStatus.NOT_FOUND, errorCode)
}

/**
 * Throw Unsupported media type (415)
 *
 * @param message
 * @param errorCode
 */
export const unsupportedMediaType = (
	message = 'Invalid photo type',
	errorCode?: ErrorCode,
) => {
	return new ApiError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE, errorCode)
}

/**
 * Throw Internal server (500)
 *
 * @param message
 * @param errorCode
 */
export const internalServer = (
	message = 'Unexpected server error',
	errorCode?: ErrorCode,
) => {
	return new ApiError(message, httpStatus.INTERNAL_SERVER_ERROR, errorCode)
}

export default {
	badRequest,
	unauthorized,
	notFound,
	unsupportedMediaType,
	internalServer,
}
