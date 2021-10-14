const express = require('express');
const insertUserService = require('../../business/services/insertUser.service');
const listUsersService = require('../../business/services/listUsers.service');
const getUserService = require('../../business/services/getUser.service');
const updateCompanyService = require('../../business/services/updateCompany.service');

const router = express.Router();
const { basePath } = require('../../business/utils/configs/api.config');
const authMiddleware = require('../middlewares/authentication/authentication.middleware');
const headersValidation = require('../middlewares/validations/headers.validation');
const userValidation = require('../middlewares/validations/user.validation');

router.post(
	`${basePath}/v1/users`,
	[authMiddleware, headersValidation, userValidation],
	async (req, res, next) => {
		try {
			const transactionId = req.headers['transaction-id'];
			logger.addContext('transaction_id', transactionId);
			const response = await insertUserService.execute(req.body.data);
			logger.info(JSON.stringify({ message: 'Usuario insertado correctamente', data: response }));
			res.status(201).json({ data: response });
		} catch (error) {
			next(error);
		}
	}
);

router.get(`${basePath}/v1/users`, [authMiddleware, headersValidation], async (req, res, next) => {
	try {
		const transactionId = req.headers['transaction-id'];
		logger.addContext('transaction_id', transactionId);
		const response = await listUsersService.getListUsers(req);
		logger.info(JSON.stringify({ message: 'Lista de usuarios obtenidas', data: response }));
		res.json({ data: { users: response } });
	} catch (error) {
		next(error);
	}
});

router.get(
	`${basePath}/v1/users/:email`,
	[authMiddleware, headersValidation],
	async (req, res, next) => {
		try {
			const transactionId = req.headers['transaction-id'];
			logger.addContext('transaction_id', transactionId);
			const response = await getUserService.execute(req.params.email);
			logger.info(JSON.stringify({ message: 'Usuario obtenido', data: response }));
			res.json({ data: response });
		} catch (error) {
			next(error);
		}
	}
);

// TODO Se debe modificar esta ruta
// router.put(
// 	`${basePath}/v1/companies/:id`,
// 	[authMiddleware, headersValidation, userValidation],
// 	async (req, res, next) => {
// 		try {
// 			const transactionId = req.headers['transaction-id']
// 			logger.addContext('transaction_id', transactionId)
// 			const response = await updateCompanyService.execute(req.params.id, req.body.data)
// 			logger.info(JSON.stringify({ message: 'Empresa actualizada', data: response }))
// 			res.json({ data: response })
// 		} catch (error) {
// 			next(error)
// 		}
// 	}
// )

module.exports = router;
