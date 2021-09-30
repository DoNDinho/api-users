'use strict';
const express = require('express');
const userValidation = express.Router();
const Ajv = require('ajv');
const userSchema = require('./models/user.model');

userValidation.use((req, res, next) => {
	const data = req.body;
	const ajv = new Ajv();
	const validate = ajv.compile(userSchema);
	const valid = validate(data);

	logger.info('Validando request de la solicitud');
	// TODO modificar esta condicional
	if (valid) {
		logger.info('Request valido');
		next();
	} else {
		logger.error(`Request invalido - ${validate.errors[0].message}`);
		res.status(400).json({
			code: '400',
			message: validate.errors[0].message
		});
	}
});

module.exports = userValidation;
