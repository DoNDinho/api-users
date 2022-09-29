'use strict'
const usersRepository = require('../../../data/repository/users.repository')

const execute = async (email) => {
	try {
		await deleteUser(email)
	} catch (error) {
		throw error
	}
}

const deleteUser = async (email) => {
	try {
		await usersRepository.deleteUser(email)
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
