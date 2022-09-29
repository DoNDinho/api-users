'use strict'
class MySqlRunner {
	constructor(client) {
		this.connection = client.getConnection()
	}

	async runProcedure(procedure) {
		try {
			const result = []
			for (const statement of procedure.statements) {
				const [rows] = await this.connection.execute(statement, procedure.values)
				result.push(rows)
			}
			return result
		} catch (error) {
			console.log(`error al ejecutar procedimiento ${procedure.name}. ${error.message}`)
			throw error
		}
	}
}

module.exports = MySqlRunner
