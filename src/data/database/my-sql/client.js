'use strict'
const mysql = require('mysql2/promise')

class MySqlClient {
	constructor(connection) {
		this.connection = connection
	}

	static async getInstance() {
		if (!MySqlClient.instance) {
			const pool = mysql.createPool({
				host: process.env.MYSQL_HOST,
				user: process.env.MYSQL_USER,
				password: process.env.MYSQL_PASS,
				database: process.env.MYSQL_DATABASE,
				multipleStatements: true,
				waitForConnections: true
			})

			MySqlClient.instance = new MySqlClient(pool)
		}

		return MySqlClient.instance
	}

	getConnection() {
		return this.connection
	}
}

module.exports = MySqlClient
