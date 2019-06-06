import passport from 'passport'
import {RequestHandler} from 'express'
import {newToken} from '../../utils/auth'
import {successResponse} from '../../utils/apiResponse'
import * as services from './auth.service'
import {UserDocument} from '../user/user.model'
import config from '../../config'

/**
 * Sign up new user
 *
 * @param req
 * @param res
 * @param next
 */
export const signup: RequestHandler = async (req, res, next) => {
	const newUser = req.body

	const host =
		config.clientHost || config.isDev
			? `${req.protocol}://${req.hostname}`
			: `${req.protocol}://${req.hostname}:${config.port}`

	const activateUserPath = `${host}/auth/active`

	try {
		const token = await services.signup(newUser, activateUserPath)

		return res.json(successResponse(token))
	} catch (err) {
		return next(err)
	}
}

/**
 * Sign in user
 *
 * @param req
 * @param res
 * @param next
 */
export const signin: RequestHandler = (req, res, next) => {
	passport.authenticate('local', (error: Error, user: UserDocument) => {
		if (error) {
			return next(error)
		}

		if (user) {
			const token = newToken(user)
			return res.json(successResponse({token}))
		}
	})(req, res, next)
}

/**
 * Forget password
 * Save a reset password token and reset password expire to user model
 * Send user a link that has the reset password token
 *
 * @param req
 * @param res
 * @param next
 */
export const forgotPassword: RequestHandler = async (req, res, next) => {
	// Check if email that user submitted belongs to an user

	const {email} = req.body

	const host =
		config.clientHost || config.isDev
			? `${req.protocol}://${req.hostname}`
			: `${req.protocol}://${req.hostname}:${config.port}`

	const resetUrlPath = `${host}/auth/password/reset`

	try {
		await services.forgotPassword(email, resetUrlPath)

		const message = 'Please check your email'

		return res.json(successResponse(message, true))
	} catch (error) {
		return next(error)
	}
}

/**
 * Reset password
 * Verify reset password token from request param
 * Save new user password and clear reset password token & expire
 *
 * @param req
 * @param res
 * @param next
 */
export const resetPassword: RequestHandler = async (req, res, next) => {
	const {resetToken} = req.params
	const {password} = req.body

	try {
		await services.resetPassword(resetToken, password)

		const message = 'Password has been successfully rest'

		return res.json(successResponse(message, true))
	} catch (error) {
		return next(error)
	}
}

/**
 * Activate account
 *
 * Verify reset token from request param
 * Active user account and clear reset password token & expire
 *
 * @param req
 * @param res
 * @param next
 */
export const activateAccount: RequestHandler = async (req, res, next) => {
	const {resetToken} = req.params

	try {
		await services.activateAccount(resetToken)

		const message = 'Active user successfully'

		return res.json(successResponse(message, true))
	} catch (error) {
		return next(error)
	}
}
