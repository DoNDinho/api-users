'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
global.logger = require('./business/utils/configs/log4js.config')
const healthRoute = require('./client/routes/health')
const rolesRoutes = require('./client/routes/roles.routes')
const usersRoutes = require('./client/routes/users.routes')
const { errorHandler } = require('./client/middlewares/error-handler/error-handler')
// const { authorizate } = require('./client/middlewares/authorizations/authorizations')
const port = process.env.PORT

const app = express()

// Configurando middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(authorizate)

// Configurando rutas
app.use(healthRoute)
app.use(rolesRoutes)
app.use(usersRoutes)

app.use(async (err, req, res, next) => {
	await errorHandler(err, res)
})

// Iniciando servidor
app.listen(port, () => {
	logger.info('Servidor en puerto', port)
})