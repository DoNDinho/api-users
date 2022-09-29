'use strict'
const listRoles = () => {
	return {
		name: 'SP_LISTAR_ROLES',
		statements: [`CALL SP_LISTAR_ROLES();`],
		values: []
	}
}

const insertUser = (user, password) => {
	const name = user.name
	const birthdate = user.birthdate
	const email = user.contact.email
	const idRol = user.role.code
	const rut = user.identification_document?.number
		? `"${user.identification_document?.number}"`
		: 'NULL'
	const validator = user.identification_document?.validator
		? `"${user.identification_document?.validator}"`
		: 'NULL'
	const lastName = user.last_name ? `"${user.last_name}"` : 'NULL'
	const secondLastName = user.second_last_name ? `"${user.second_last_name}"` : 'NULL'

	return {
		name: 'SP_INSERTAR_USUARIO',
		statements: [
			`CALL SP_INSERTAR_USUARIO(${idRol}, "${email}", "${name}", "${birthdate}", ${rut}, ${validator}, ${lastName}, ${secondLastName}, "${password}");;`
		],
		values: []
	}
}

const listUsers = () => {
	return {
		name: 'SP_LISTAR_USUARIOS',
		statements: [`CALL SP_LISTAR_USUARIOS();`],
		values: []
	}
}

const listUserByEmail = (email) => {
	return {
		name: 'SP_LISTAR_USUARIO_POR_EMAIL',
		statements: [`CALL SP_LISTAR_USUARIO_POR_EMAIL("${email}");`],
		values: []
	}
}

const updateUser = (currentEmail, user) => {
	const name = user.name
	const birthdate = user.birthdate
	const email = user.contact.email
	const idRol = user.role.code
	const rut = user.identification_document?.number
		? `"${user.identification_document?.number}"`
		: 'NULL'
	const validator = user.identification_document?.validator
		? `"${user.identification_document?.validator}"`
		: 'NULL'
	const lastName = user.last_name ? `"${user.last_name}"` : 'NULL'
	const secondLastName = user.second_last_name ? `"${user.second_last_name}"` : 'NULL'

	return {
		name: 'SP_MODIFICAR_USUARIO',
		statements: [
			`CALL SP_MODIFICAR_USUARIO("${currentEmail}", ${idRol}, "${email}", "${name}", "${birthdate}", ${rut}, ${validator}, ${lastName}, ${secondLastName});`
		],
		values: []
	}
}

const updatePassword = (email, password) => {
	return {
		name: 'SP_MODIFICAR_PASSWORD',
		statements: [`CALL SP_MODIFICAR_PASSWORD("${email}", "${password}");`],
		values: []
	}
}

const deleteUser = (email) => {
	return {
		name: 'SP_ELIMINAR_USUARIO',
		statements: [`CALL SP_ELIMINAR_USUARIO("${email}");`],
		values: []
	}
}
module.exports = {
	listRoles,
	insertUser,
	listUsers,
	listUserByEmail,
	deleteUser,
	updateUser,
	updatePassword
}
