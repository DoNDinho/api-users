'use strict';
const userConverter = (user) => {
	return {
		active: user.ACTIVO || user.P_ACTIVO.trim(), // ACTIVO
		user_identification: {
			number: user.RUT_USUARIO || user.P_RUT_USUARIO, // RUT_USUARIO
			validator: user.DV_RUT || user.P_DV_RUT.trim() // DV_RUT
		},
		user_address: {
			street: user.DIRECCION || user.P_DIRECCION // DIRECCION
		},
		user_contact: {
			email: user.EMAIL || user.P_EMAIL, // EMAIL
			phone: user.TELEFONO || user.P_TELEFONO // TELEFONO
		},
		user_info: {
			name: user.NOMBRE || user.P_NOMBRE, // NOMBRE
			paternal: user.APELLIDO_PAT || user.P_APELLIDO_PAT, // APELLIDO_PAT
			maternal: user.APELLIDO_MAT || user.P_APELLIDO_MAT, // APELLIDO_MAT
			birthdate: user.FEC_NAC || user.P_FEC_NAC // FEC_NAC
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
			}
		}
	};
};

module.exports = { userConverter };
