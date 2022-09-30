'use strict'
const httpConsumer = require('../../../business/utils/http-consumer/http-consumer.service')

const authorizate = async (req, res, next) => {
	const AUTH_URL =
		'https://siglo-xxi-authorizations.azurewebsites.net/Authorizations/v1/authentications/{token}/validate' // process.env.AUTH_URL
	const token = req.headers.authorization.replace('Bearer ', '')
	const url = AUTH_URL.replace('{token}', token)
	const headers = { 'Content-Type': 'application/json' }
	try {
		await httpConsumer.get({ headers, url })
		next()
	} catch (error) {
		res.status(401).json({ message: 'Token invalido' })
	}
}

module.exports = { authorizate }
