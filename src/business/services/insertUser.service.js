'use strict';
const userRepository = require('../../data/repository/users.repository');
const logger = require('../utils/configs/log4js.config');
const { validateRut } = require('../utils/validateRut');
const { encryptPassword } = require('../utils/encryptPassword');

const execute = async (data) => {
	try {
		validateRut(data.user_identification.number, data.user_identification.validator);
		const passwordEncrypt = encryptPassword(data.user_credentials.password);
		await insertUser(data, passwordEncrypt);
		return data;
	} catch (error) {
		throw error;
	}
};

const insertUser = async (data, encryptPassword) => {
	try {
		const result = await userRepository.insertUser(data, encryptPassword);
		logger.info('RESULT: ', JSON.stringify(result));

		logger.info('Validando inserción de usuario');
		if (result.P_CODIGO !== '000') {
			throw { httpCode: 422, code: result.P_CODIGO, message: result.P_MENSAJE };
		}
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { execute };
