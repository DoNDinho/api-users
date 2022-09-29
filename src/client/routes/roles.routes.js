const express = require('express')
const listRolesService = require('../../business/services/roles/list-roles.service')
const router = express.Router()

router.get(`/Users/v1/roles`, async (req, res, next) => {
	try {
		// const transactionId = req.headers['transaction-id']
		// logger.addContext('transaction_id', transactionId)
		const response = await listRolesService.execute()
		logger.info({ message: 'Roles listados', data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		console.log('error: ', error.message)
		next(error)
	}
})
module.exports = router
