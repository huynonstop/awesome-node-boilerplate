import {RequestHandler} from 'express'
import * as services from './user.service'
import {successResponse} from '../../utils/apiResponse'

/**
 * Get me
 *
 * @param req
 * @param res
 */
export const getMe: RequestHandler = (req, res) => {
	return res.json(successResponse(req.user))
}

/**
 * Get users
 *
 * @param req
 * @param res
 * @param next
 */
export const getMany: RequestHandler = async (req, res, next) => {
	try {
		const {field, sort} = req.query

		const users = await services.getMany(field, sort)

		return res.json(successResponse(users))
	} catch (e) {
		return next(e)
	}
}

/**
 * Get user by id
 *
 * @param req
 * @param res
 */
export const getOne: RequestHandler = async (req, res, next) => {
	try {
		const id = req.params.id

		const user = await services.getUserById(id)

		return res.json(successResponse(user))
	} catch (e) {
		return next(e)
	}
}

/**
 * Update user with id
 *
 * @param req
 * @param res
 */
export const updateOne: RequestHandler = async (req, res, next) => {
	try {
		const {body} = req
		const id = req.params.id

		const updatedUser = await services.updateOne(id, body)

		return res.json(successResponse(updatedUser, true))
	} catch (e) {
		return next(e)
	}
}

/**
 * Delete user with id
 *
 * @param req
 * @param res
 */
export const deleteOne: RequestHandler = async (req, res, next) => {
	try {
		const id = req.params.id

		const removedUser = await services.deleteOne(id)

		return res.json(successResponse(removedUser, true))
	} catch (e) {
		return next(e)
	}
}
