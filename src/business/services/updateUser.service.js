'use strict';
const userRepository = require('../../data/repository/users.repository');
const userConverter = require('../converter/user.converter');
const { validateRut } = require('../utils/validateRut');
const { validateEmail } = require('../utils/validateEmail');
const { encryptPassword } = require('../utils/encryptPassword');
const { activeTransform } = require('../utils/activeTransform');

const updateUser = async (emailParam, user) => {
	try {
		validateRut(user.user_identification.number, user.user_identification.validator);
		validateEmail(user.user_contact.email);
		const passwordEncrypt = encryptPassword(user.user_credentials.password);
		const active = activeTransform(user.active);

		// TODO Validar los parametros del SP para ver si los devuelve
		await execute(emailParam, user, passwordEncrypt, active);

		delete user.user_credentials.password;
		return user;
	} catch (error) {
		throw error;
	}
};

const execute = async (emailParam, user, password, active) => {
	try {
		const result = await userRepository.updateUser(emailParam, user, password, active);
		logger.info('RESULT: ', JSON.stringify(result));

		logger.info('Validando actualizacion de usuario');

		switch (result.P_CODIGO) {
			case '000':
				return result;
			case '001':
				throw { httpCode: 404, code: result.P_CODIGO, message: result.P_MENSAJE };
			case '-1':
				throw {
					httpCode: 422,
					code: result.P_CODIGO,
					message: 'No puede actualizar usuario. Datos duplicados'
				};
			default:
				throw {
					httpCode: 422,
					code: result.P_CODIGO,
					message: 'No puede actualizar usuario. Consulte con el administrador'
				};
		}
	} catch (error) {
		throw error;
	}
};

module.exports = { updateUser };
