'use strict'
const usersRepository = require('../../../data/repository/users.repository')
const { userConverter } = require('../../converter/user.converter')

const execute = async () => {
	try {
		const users = await listUsers()
		return users.map((user) => userConverter(user))
	} catch (error) {
		throw error
	}
}

const listUsers = async () => {
	try {
		const result = await usersRepository.listUsers()
		return result
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
