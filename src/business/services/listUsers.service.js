'use strict';
const usersRepository = require('../../data/repository/users.repository');
const userConverter = require('../converter/user.converter');

const execute = async () => {
	try {
		const listUsers = await getListUsers();
		return await Promise.all(listUsers.map((user) => userConverter.userConverter(user)));
	} catch (error) {
		throw error;
	}
};

const getListUsers = async () => {
	try {
		const result = await usersRepository.getListUsers();
		logger.info('RESULT ', result);

		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { execute };
