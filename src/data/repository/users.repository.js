'use strict'
const MySqlClient = require('../database/my-sql/client')
const MySqlRunner = require('../database/my-sql/runner')
const sqlProcedures = require('../database/my-sql/sql_procedures')

const insertUser = async (user, password) => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.insertUser(user, password)
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

const listUsers = async () => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.listUsers()
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

const listUserByEmail = async (email) => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.listUserByEmail(email)
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

const updateUser = async (currentEmail, user) => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.updateUser(currentEmail, user)
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

const updatePassword = async (email, password) => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.updatePassword(email, password)
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

const deleteUser = async (email) => {
	try {
		const mySqlClient = await MySqlClient.getInstance()
		const procedure = sqlProcedures.deleteUser(email)
		const sqlRunner = new MySqlRunner(mySqlClient)
		const result = await sqlRunner.runProcedure(procedure)
		console.log(JSON.stringify(result))
		return result.pop()[0]
	} catch (error) {
		throw error
	}
}

module.exports = { insertUser, listUsers, listUserByEmail, deleteUser, updateUser, updatePassword }
