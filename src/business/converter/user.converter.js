'use strict';
const userConverter = (user) => {
	return {
		id: user.ID_USUARIO || user.P_ID_USUARIO, // ID_USUARIO
		active: user.ACTIVO == '1' ? true : false || user.P_ACTIVO.trim() == '1' ? true : false, // ACTIVO
		user_identification: {
			number: user.RUT || user.P_RUT, // RUT
			validator: user.DV || user.P_DV.trim() // DV
		},
		user_contact: {
			email: user.EMAIL || user.P_EMAIL, // EMAIL
			phone: user.TELEFONO || user.P_TELEFONO // TELEFONO
		},
		user_info: {
			names: user.NOMBRES || user.P_NOMBRES, // NOMBRES
			paternal: user.APATERNO || user.P_APATERNO, // APATERNO
			maternal: user.AMATERNO || user.P_AMATERNO, // AMATERNO
			birthdate: user.FECHANACIMIENTO || user.P_FECHANACIMIENTO // FECHANACIMIENTO
		},
		user_credentials: {
			role: {
				code: user.ID_ROL || user.P_ID_ROL, // ID_ROL
				description: user.DESCRIPCION_ROL || user.P_DESCRIPCION_ROL // opcional?
			}
		},
		user_profesion: {
			company: {
				code: user.ID_EMPRESA || user.P_ID_EMPRESA, // ID_EMPRESA
				description: user.NOMBRE_EMPRESA || user.P_NOMBRE_EMPRESA // NOMBRE_EMPRESA
			},
			job: {
				code: user.ID_CARGO || user.P_ID_CARGO, // ID_CARGO
				description: user.DESCRIPCION_CARGO || user.P_DESCRIPCION_CARGO // opcional?
			},
			contract_start_date: user.INICIO_CONTRATO || user.P_INICIO_CONTRATO // INICIO CONTRATO
		}
	};
};

module.exports = { userConverter };
