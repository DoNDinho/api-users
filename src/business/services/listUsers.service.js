'use strict';
const usersRepository = require('../../data/repository/users.repository');
const userConverter = require('../converter/user.converter');

const getListUsers = async (req) => {
	try {
		let listUsers = await execute();

		if (req.query.id_rol) {
			listUsers = await filterUsersByRol(req.query.id_rol, listUsers);
		}

		return await Promise.all(listUsers.map((user) => userConverter.userConverter(user)));
	} catch (error) {
		throw error;
	}
};

const execute = async () => {
	try {
		const result = await usersRepository.getListUsers();
		logger.info('RESULT ', result);

		return result;
	} catch (error) {
		throw error;
	}
};

const filterUsersByRol = async (id_rol, listUsers) => {
	return await listUsers.filter((user) => user.ID_ROL == id_rol);
};

module.exports = { getListUsers };
