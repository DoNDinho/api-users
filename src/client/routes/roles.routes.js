const express = require('express');
const { basePath } = require('../../business/utils/configs/api.config');
const logger = require('../../business/utils/configs/log4js.config');
const authMiddleware = require('../middlewares/authentication/authentication.middleware');
const headersValidation = require('../middlewares/validations/headers.validation');
const listRolesService = require('../../business/services/roles/listRoles.service');
const router = express.Router();

router.get(`${basePath}/v1/roles`, [authMiddleware, headersValidation], async (req, res, next) => {
	try {
		const transactionId = req.headers['transaction-id'];
		logger.addContext('transaction_id', transactionId);
		const response = await listRolesService.getListRoles();
		logger.info(JSON.stringify({ message: 'Lista de roles de usuario obtenidos', data: response }));
		res.json({ data: { roles: response } });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
