'use strict'
const usersRepository = require('../../../data/repository/users.repository')
const { userConverter } = require('../../converter/user.converter')

const execute = async (email) => {
	try {
		const user = await listUserByEmail(email)
		return userConverter(user)
	} catch (error) {
		throw error
	}
}

const listUserByEmail = async (email) => {
	try {
		const result = await usersRepository.listUserByEmail(email)
		return result[0]
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
