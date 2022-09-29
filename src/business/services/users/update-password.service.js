'use strict'
const usersRepository = require('../../../data/repository/users.repository')
const encrypter = require('../../utils/password-encrypter/password-encrypter')

const execute = async (email, password) => {
	try {
		const encrypterPassword = encrypter.encryptPassword(password)
		await updatePassword(email, encrypterPassword)
	} catch (error) {
		throw error
	}
}

const updatePassword = async (email, password) => {
	try {
		const result = await usersRepository.updatePassword(email, password)
		return result
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
