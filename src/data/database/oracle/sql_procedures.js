'use strict';
const oracledb = require('oracledb');

const insertUser = (user, password) => {
	const { number, validator } = user.user_identification;
	const { email, phone } = user.user_contact;
	const { names, paternal, maternal, birthdate } = user.user_info;
	const codeRole = user.user_credentials.role.code;
	const codeJob = user.user_profesion.job.code;
	let codeCompany = null;
	let contractStartDate = null;

	if (user.user_profesion.hasOwnProperty('company')) {
		codeCompany = user.user_profesion.company.code || null;
	}
	if (user.user_profesion.contract_start_date) {
		contractStartDate = user.user_profesion.contract_start_date;
	}

	return {
		name: 'SP_INSERTAR_USUARIO',
		statement: `BEGIN SP_INSERTAR_USUARIO('${number}', '${validator}', '${names}', '${paternal}', '${maternal}', '${birthdate}', '${email}', ${phone}, '${password}', ${codeJob}, ${codeRole}, '${contractStartDate}', ${codeCompany}, :P_CODIGO,:P_MENSAJE); END;`,
		bind: {
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
		statement: `BEGIN SP_LISTAR_USUARIO_POR_EMAIL(:P_EMAIL, :P_ID_USUARIO, :P_RUT, :P_DV, :P_NOMBRES, :P_APATERNO, :P_AMATERNO, :P_FECHANACIMIENTO, :P_TELEFONO, :P_ACTIVO, :P_ID_CARGO, :P_DESCRIPCION_CARGO, :P_ID_ROL, :P_DESCRIPCION_ROL, :P_INICIO_CONTRATO, :P_ID_EMPRESA, :P_DESCRIPCION_EMPRESA,      :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_EMAIL: { val: email, type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_INOUT },
			P_ID_USUARIO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_RUT: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_DV: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_NOMBRES: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_APATERNO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_AMATERNO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_FECHANACIMIENTO: { type: oracledb.DB_TYPE_DATE, dir: oracledb.BIND_OUT },
			P_TELEFONO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_ACTIVO: { type: oracledb.DB_TYPE_CHAR, dir: oracledb.BIND_OUT },
			P_ID_CARGO: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DESCRIPCION_CARGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_ID_ROL: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DESCRIPCION_ROL: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_INICIO_CONTRATO: { type: oracledb.DB_TYPE_DATE, dir: oracledb.BIND_OUT },
			P_ID_EMPRESA: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_DESCRIPCION_EMPRESA: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

const updateUser = (emailParam, user, password, active) => {
	const { number, validator } = user.user_identification;
	const { phone, email } = user.user_contact;
	const { names, paternal, maternal, birthdate } = user.user_info;
	const codeRol = user.user_credentials.role.code;
	const codeJob = user.user_profesion.job.code;
	let codeCompany = null;
	let contractStartDate = null;

	if (user.user_profesion.hasOwnProperty('company')) {
		codeCompany = user.user_profesion.company.code || null;
	}
	if (user.user_profesion.contract_start_date) {
		contractStartDate = user.user_profesion.contract_start_date;
	}

	return {
		name: 'SP_MODIFICAR_USUARIO',
		statement: `BEGIN SP_MODIFICAR_USUARIO('${emailParam}', '${number}', '${validator}', '${names}', '${paternal}', '${maternal}', '${birthdate}', '${email}', ${phone}, '${password}', '${active}', ${codeJob}, ${codeRol}, '${contractStartDate}', ${codeCompany}, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

const getListRoles = () => {
	return {
		name: 'SP_LISTAR_ROLES',
		statement: `BEGIN SP_LISTAR_ROLES(:P_RECORDSET, :P_COUNT, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_RECORDSET: { type: oracledb.DB_TYPE_CURSOR, dir: oracledb.BIND_OUT },
			P_COUNT: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

const getListJobs = () => {
	return {
		name: 'SP_LISTAR_CARGOS',
		statement: `BEGIN SP_LISTAR_CARGOS(:P_RECORDSET, :P_COUNT, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_RECORDSET: { type: oracledb.DB_TYPE_CURSOR, dir: oracledb.BIND_OUT },
			P_COUNT: { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

module.exports = {
	getUserByEmail,
	getListUsers,
	insertUser,
	updateUser,
	getListRoles,
	getListJobs
};
