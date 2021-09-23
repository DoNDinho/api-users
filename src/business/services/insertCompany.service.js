'use strict'
const companiesRepository = require('../../data/repository/users.repository')
const logger = require('../utils/configs/log4js.config')
const { validateRut } = require('../utils/validateRut')

const execute = async (data) => {
	try {
		validateRut(data.company_identification.number, data.company_identification.validator)
		await insertCompany(data)
		return data
	} catch (error) {
		throw error
	}
}

const insertCompany = async (data) => {
	try {
		const result = await companiesRepository.insertCompany(data)
		logger.info('RESULT: ', JSON.stringify(result))

		logger.info('Validando inserción de empresa')
		if (result.P_CODIGO !== '000') {
			throw { httpCode: 422, code: result.P_CODIGO, message: result.P_MENSAJE }
		}
		return result
	} catch (error) {
		throw error
	}
}

module.exports = { execute }
