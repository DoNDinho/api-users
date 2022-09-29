'use strict'
const rolesRepository = require('../../../data/repository/roles.repository')
const roleConverter = require('../../converter/role.converter')

const execute = async () => {
	try {
		const rolesData = await listRoles()
		const roles = rolesData.map((role) => roleConverter.parseRolesResponse(role))
		return { roles }
	} catch (error) {
		throw error
	}
}

const listRoles = async () => {
	try {
		const result = await rolesRepository.listRoles()
		return result
	} catch (error) {
		throw { httpCode: 422, message: error.message }
	}
}

module.exports = { execute }
