const express = require('express')
const listRolesService = require('../../business/services/roles/list-roles.service')
const { authorizate } = require('../middlewares/authorizations/authorizations')
const router = express.Router()

router.get(`/Users/v1/roles`, [authorizate], async (req, res, next) => {
	try {
		const response = await listRolesService.execute()
		logger.info({ message: 'Roles listados', data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		console.log('error: ', error.message)
		next(error)
	}
})
module.exports = router
