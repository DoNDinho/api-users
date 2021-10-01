const jobsRepository = require('../../../data/repository/jobs.repository');
const jobConverter = require('../../converter/job.converter');

const getListJobs = async () => {
	try {
		const listJobs = await execute();
		return await Promise.all(listJobs.map((job) => jobConverter.jobConverter(job)));
	} catch (error) {
		throw error;
	}
};

const execute = async () => {
	try {
		const result = await jobsRepository.getListJobs();
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getListJobs };
