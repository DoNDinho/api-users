const roleConverter = (role) => {
	return {
		code: role.ID_ROL, // ID_CARGO
		description: role.DESCRIPCION // DESCRIPCION
	};
};

module.exports = { roleConverter };
