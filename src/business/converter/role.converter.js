'use strict'
const parseRolesResponse = (rolData) => {
	return {
		code: rolData.ID_ROL,
		name: rolData.DESCRIPCION
	}
}

module.exports = { parseRolesResponse }
