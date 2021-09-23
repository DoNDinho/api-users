'use strict';
const companiesRepository = require('../../data/repository/users.repository');
const companyConverter = require('../converter/user.converter');
const { validateRut } = require('../utils/validateRut');

const execute = async (id, data) => {
	try {
		validateRut(data.company_identification.number, data.company_identification.validator);
		const companyData = await updateCompany(id, data);
		return companyConverter.parseCompanyResponse(companyData);
	} catch (error) {
		throw error;
	}
};

const updateCompany = async (id, data) => {
	try {
		const result = await companiesRepository.updateCompany(id, data);
		logger.info('RESULT: ', JSON.stringify(result));

		logger.info('Validando actuaslizacion de empresa');

		switch (result.P_CODIGO) {
			case '000':
				return result;
			case '001':
				throw { httpCode: 404, code: result.P_CODIGO, message: result.P_MENSAJE };
			case '-1':
				throw { httpCode: 422, code: result.P_CODIGO, message: 'No puede actualizar empresa. Datos duplicados' };
			default:
				throw {
					httpCode: 422,
					code: result.P_CODIGO,
					message: 'No puede actualizar empresa. Consulte con el administrador'
				};
		}
	} catch (error) {
		throw error;
	}
};

module.exports = { execute };
