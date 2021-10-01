const jobConverter = (job) => {
	return {
		code: job.ID_CARGO, // ID_CARGO
		description: job.DESCRIPCION // DESCRIPCION
	};
};

module.exports = { jobConverter };
