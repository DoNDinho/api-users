'use strict';
const formatDate = (fecha) => {
	if (!fecha) {
		return fecha;
	}

	fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
	const year = fecha.getFullYear();
	const month = fecha.getMonth() + 1 < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
	const day = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();

	return `${year}-${month}-${day}`;
};

module.exports = { formatDate };
