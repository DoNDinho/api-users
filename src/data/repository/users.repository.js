'use strict';
const Runner = require('../database/oracle/runner/runner');
const sqlProcedures = require('../database/oracle/sql_procedures');

const insertUser = async (user, encryptPassword) => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.insertUser(user, encryptPassword);
		const result = await database.runProcedure(procedure);
		return result.outBinds;
	} catch (error) {
		throw error;
	}
};

const getListUsers = async () => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.getListUsers();
		const result = await database.runCursorProcedure(procedure);
		return result;
	} catch (error) {
		throw error;
	}
};

const getUserByEmail = async (email) => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.getUserByEmail(email);
		const result = await database.runProcedure(procedure);
		return result.outBinds;
	} catch (error) {
		throw error;
	}
};

const updateUser = async (emailParam, user, password, active) => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.updateUser(emailParam, user, password, active);
		const result = await database.runProcedure(procedure);
		return result.outBinds;
	} catch (error) {
		throw error;
	}
};

module.exports = { getListUsers, getUserByEmail, insertUser, updateUser };
