'use strict'
const usersRepository = require('../../../data/repository/users.repository')
const encrypter = require('../../utils/password-encrypter/password-encrypter')

const execute = async (user) => {
	try {
		const password = encrypter.encryptPassword(user.credentials.password)
		await insertUser(user, password)
	} catch (error) {
		throw error
	}
}

const insertUser = async (user, password) => {
	try {
		const result = await usersRepository.insertUser(user, password)
		return result
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
