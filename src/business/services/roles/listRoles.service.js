const rolesRepository = require('../../../data/repository/roles.repository');
const roleConverter = require('../../converter/role.converter');

const getListRoles = async () => {
	try {
		const listRoles = await execute();
		return await Promise.all(listRoles.map((role) => roleConverter.roleConverter(role)));
	} catch (error) {
		throw error;
	}
};

const execute = async () => {
	try {
		const result = await rolesRepository.getListRoles();
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getListRoles };
