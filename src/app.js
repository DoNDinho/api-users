'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
global.logger = require('./business/utils/configs/log4js.config')
const healthRoute = require('./client/routes/health')
const rolesRoutes = require('./client/routes/roles.routes')
const usersRoutes = require('./client/routes/users.routes')
const reservationRoutes = require('./client/routes/reservation.routes')
const { errorHandler } = require('./client/middlewares/error-handler/error-handler')
const port = process.env.PORT

const app = express()

// Configurando middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurando rutas
app.use(healthRoute)
app.use(rolesRoutes)
app.use(usersRoutes)
app.use(reservationRoutes)

app.use(async (err, req, res, next) => {
  await errorHandler(err, res)
})

// Iniciando servidor
app.listen(port, () => {
  logger.info('Servidor en puerto', port)
})
