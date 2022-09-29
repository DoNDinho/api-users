'use strict'
const usersRepository = require('../../../data/repository/users.repository')

const execute = async (currentEmail, user) => {
	try {
		await updateUser(currentEmail, user)
	} catch (error) {
		throw error
	}
}

const updateUser = async (currentEmail, user) => {
	try {
		const result = await usersRepository.updateUser(currentEmail, user)
		return result
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
