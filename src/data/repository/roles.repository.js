const Runner = require('../database/oracle/runner/runner');
const sqlProcedures = require('../database/oracle/sql_procedures');

const getListRoles = async () => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.getListRoles();
		const result = await database.runCursorProcedure(procedure);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getListRoles };
