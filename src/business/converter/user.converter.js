'use strict'
const { formatDate } = require('../utils/date/date-formatter')

const userConverter = (userData) => {
	const user = {
		...createDni(userData),
		name: userData.NOMBRE,
		birthdate: formatDate(userData.FEC_NAC),
		contact: {
			email: userData.EMAIL
		},
		role: {
			code: userData.ID_ROL,
			name: userData.DESCRIPCION_ROL
		}
	}
	if (userData.APATERNO) {
		user.last_name = userData.APATERNO
	}
	if (userData.AMATERNO) {
		user.second_last_name = userData.AMATERNO
	}
	return user
}

const createDni = (userData) => {
	if (!userData.RUT || !userData.DV) {
		return {}
	}
	return {
		identification_document: {
			number: userData.RUT,
			validator: userData.DV
		}
	}
}

module.exports = { userConverter }
