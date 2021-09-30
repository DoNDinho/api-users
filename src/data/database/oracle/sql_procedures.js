'use strict';
const oracledb = require('oracledb');

const insertUser = (user, password) => {
	const { number, validator } = user.user_identification;
	const { street } = user.user_address;
	const { email, phone } = user.user_contact;
	const { name, paternal, maternal, birthdate } = user.user_info;
	const codeRole = user.user_credentials.role.code;
	const codeCompany = user.user_profesion.company.code;
	const codeJob = user.user_profesion.job.code;

	return {
		name: 'SP_INSERTAR_USUARIO',
		statement: `BEGIN SP_INSERTAR_USUARIO('${number}', '${validator}', '${codeCompany}', '${name}', '${paternal}', '${maternal}', :P_FEC_NAC, '${email}', '${phone}', '${street}', '${codeJob}', '${password}', '${codeRole}', :P_CODIGO,:P_MENSAJE); END;`,
		bind: {
			P_FEC_NAC: { val: birthdate, dir: oracledb.BIND_IN },
			P_CODIGO: { dir: oracledb.BIND_OUT },
			P_MENSAJE: { dir: oracledb.BIND_OUT }
		}
	};
};

const getListUsers = () => {
	return {
		name: 'SP_LISTAR_USUARIOS',
		statement: `BEGIN SP_LISTAR_USUARIOS(:P_RECORDSET, :P_COUNT, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_RECORDSET: { type: oracledb.DB_TYPE_CURSOR, dir: oracledb.BIND_OUT },
			P_COUNT: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

const getUserByEmail = (email) => {
	return {
		name: 'SP_LISTAR_USUARIO_POR_EMAIL',
		statement: `BEGIN SP_LISTAR_USUARIO_POR_EMAIL(:P_EMAIL, :P_ID_USUARIO, :P_RUT_USUARIO, :P_DV_RUT, :P_NOMBRE, :P_APELLIDO_PAT, :P_APELLIDO_MAT, :P_FEC_NAC, :P_TELEFONO, :P_DIRECCION, :P_ACTIVO, :P_ID_EMPRESA, :P_NOMBRE_EMPRESA, :P_ID_CARGO, :P_DESCRIPCION_CARGO, :P_ID_ROL, :P_DESCRIPCION_ROL, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_EMAIL: { val: email, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_ID_USUARIO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_RUT_USUARIO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_DV_RUT: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_NOMBRE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_APELLIDO_PAT: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_APELLIDO_MAT: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_FEC_NAC: { type: oracledb.DB_TYPE_DATE, dir: oracledb.BIND_OUT },
			P_TELEFONO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DIRECCION: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_ACTIVO: { type: oracledb.DB_TYPE_CHAR, dir: oracledb.BIND_OUT },
			P_ID_EMPRESA: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_NOMBRE_EMPRESA: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_ID_CARGO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DESCRIPCION_CARGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_ID_ROL: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DESCRIPCION_ROL: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

const updateCompany = (id, company) => {
	const { number, validator } = company.company_identification;
	const { name, email, phone } = company.company_data;
	const { city, street } = company.company_address;

	return {
		name: 'SP_MODIFICAR_EMPRESA',
		statement: `BEGIN SP_MODIFICAR_EMPRESA(:P_ID_EMPRESA, :P_RUT_EMPRESA, :P_DV_RUT, :P_NOMBRE_EMPRESA, :P_EMAIL_EMPRESA, :P_TELEFONO_EMPRESA, :P_CIUDAD, :P_DIRECCION, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_ID_EMPRESA: { val: parseInt(id), type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_INOUT },
			P_RUT_EMPRESA: { val: number, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_DV_RUT: { val: validator, type: oracledb.DB_TYPE_CHAR, dir: oracledb.BIND_INOUT },
			P_NOMBRE_EMPRESA: { val: name, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_EMAIL_EMPRESA: { val: email, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_TELEFONO_EMPRESA: { val: phone, type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_INOUT },
			P_CIUDAD: { val: city, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_DIRECCION: { val: street, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

module.exports = { getUserByEmail, getListUsers, insertUser };
