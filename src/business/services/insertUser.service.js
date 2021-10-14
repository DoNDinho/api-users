'use strict';
const userRepository = require('../../data/repository/users.repository');
const logger = require('../utils/configs/log4js.config');
const { validateRut } = require('../utils/validateRut');
const { encryptPassword } = require('../utils/encryptPassword');
const { validateEmail } = require('../utils/validateEmail');

const execute = async (data) => {
	try {
		validateRut(data.user.user_identification.number, data.user.user_identification.validator);
		validateEmail(data.user.user_contact.email);
		const passwordEncrypt = encryptPassword(data.user.user_credentials.password);
		await insertUser(data.user, passwordEncrypt);
		return data;
	} catch (error) {
		throw error;
	}
};

const insertUser = async (user, encryptPassword) => {
	try {
		const result = await userRepository.insertUser(user, encryptPassword);
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
