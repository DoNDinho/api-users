'use strict';
const userRepository = require('../../data/repository/users.repository');
const userConverter = require('../converter/user.converter');

const execute = async (email) => {
	try {
		const userData = await getUserByEmail(email);
		return userConverter.userConverter(userData);
	} catch (error) {
		throw error;
	}
};

const getUserByEmail = async (email) => {
	try {
		const result = await userRepository.getUserByEmail(email);
		logger.info('RESULT: ', JSON.stringify(result));

		logger.info('Validando existencia de usuario');
		if (result.P_CODIGO !== '000') {
			throw { httpCode: 404, code: result.P_CODIGO, message: result.P_MENSAJE };
		}
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { execute };
