'use strict';
const userConverter = (user) => {
	return {
		id: user.ID_USUARIO || user.P_ID_USUARIO,
		active: user.ACTIVO == '1' ? true : false || user.P_ACTIVO.trim() == '1' ? true : false,
		user_identification: {
			number: user.RUT || user.P_RUT,
			validator: user.DV || user.P_DV.trim()
		},
		user_contact: {
			email: user.EMAIL || user.P_EMAIL,
			phone: user.TELEFONO || user.P_TELEFONO
		},
		user_info: {
			names: user.NOMBRES || user.P_NOMBRES,
			paternal: user.APATERNO || user.P_APATERNO,
			maternal: user.AMATERNO || user.P_AMATERNO,
			birthdate: user.FECHANACIMIENTO || user.P_FECHANACIMIENTO
		},
		user_credentials: {
			role: {
				code: user.ID_ROL || user.P_ID_ROL,
				description: user.DESCRIPCION_ROL || user.P_DESCRIPCION_ROL
			}
		},
		user_profesion: {
			company: {
				code: user.ID_EMPRESA || user.P_ID_EMPRESA,
				description: user.DESCRIPCION_EMPRESA || user.P_DESCRIPCION_EMPRESA
			},
			job: {
				code: user.ID_CARGO || user.P_ID_CARGO,
				description: user.DESCRIPCION_CARGO || user.P_DESCRIPCION_CARGO
			},
			contract_start_date: user.INICIO_CONTRATO || user.P_INICIO_CONTRATO
		}
	};
};

module.exports = { userConverter };
