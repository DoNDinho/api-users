const express = require('express')
const insertUserService = require('../../business/services/users/insert-user.service')
const listUsersService = require('../../business/services/users/list-users.service')
const listUserByEmailService = require('../../business/services/users/list-user-by-email.service')
const deleteUserService = require('../../business/services/users/delete-user.service')
const updateUserService = require('../../business/services/users/update-user.service')
const updatePasswordService = require('../../business/services/users/update-password.service')
const router = express.Router()

router.post(`/Users/v1/users`, async (req, res, next) => {
	try {
		await insertUserService.execute(req.body.user)
		const message = 'Usuario registrado con exito'
		const response = { message }
		logger.info({ message, data: JSON.stringify(response) })
		res.status(201).json(response)
	} catch (error) {
		console.log('error: ', error.message)
		next(error)
	}
})

router.get('/Users/v1/users', async (req, res, next) => {
	try {
		const users = await listUsersService.execute()
		const response = { users }
		logger.info({ message: 'Usuarios obtenidos', data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		next(error)
	}
})

router.get('/Users/v1/users/:email', async (req, res, next) => {
	try {
		const user = await listUserByEmailService.execute(req.params.email)
		const response = { user }
		logger.info({ message: 'Usuarios obtenidos', data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		next(error)
	}
})

router.patch('/Users/v1/users/:email', async (req, res, next) => {
	try {
		await updateUserService.execute(req.params.email, req.body.user)
		const message = 'Usuario modificado con exito'
		const response = { message }
		logger.info({ message, data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		next(error)
	}
})

router.patch('/Users/v1/users/:email/change-password', async (req, res, next) => {
	try {
		await updatePasswordService.execute(req.params.email, req.body.user.credentials.password)
		const message = 'Password modificado con exito'
		const response = { message }
		logger.info({ message, data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		next(error)
	}
})

router.delete('/Users/v1/users/:email', async (req, res, next) => {
	try {
		await deleteUserService.execute(req.params.email)
		const message = 'Usuario eliminado con exito'
		const response = { message }
		logger.info({ message, data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		next(error)
	}
})

module.exports = router
