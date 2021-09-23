'use strict'
const validateRut = (rutRq, dvRut) => {
	logger.info('Validando RUT')
	let digv = dvRut
	let rut = rutRq
	if (digv == 'K') digv = 'k'
	if (dv(rut) == digv) {
		logger.info('RUT valido')
	} else {
		logger.error('RUT invalido')
		throw { httpCode: 422, code: '422', message: 'RUT invalido' }
	}
}

const dv = (T) => {
	let M = 0,
		S = 1
	for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11
	return S ? S - 1 : 'k'
}

module.exports = { validateRut }
