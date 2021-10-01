const Runner = require('../database/oracle/runner/runner');
const sqlProcedures = require('../database/oracle/sql_procedures');

const getListJobs = async () => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.getListJobs();
		const result = await database.runCursorProcedure(procedure);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getListJobs };
