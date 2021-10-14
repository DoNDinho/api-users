'use strict';
const validateEmail = (email) => {
	logger.info(`Validando email ${email}`);
	const emailRegex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (emailRegex.test(email)) {
		logger.info('Email valido');
	} else {
		logger.error('Email invalido');
		throw { httpCode: 422, code: '422', message: 'Email invalido' };
	}
};

module.exports = { validateEmail };
