const express = require('express')
const insertReservationService = require('../../business/services/reservation/insert-reservation.service')
const deleteReservationService = require('../../business/services/reservation/delete-reservation.service')
const listReservationService = require('../../business/services/reservation/list-reservation.service')
const router = express.Router()

router.post(`/Users/v1/users/:email/reservations`, async (req, res, next) => {
  try {
    await insertReservationService.execute(req.body.reservation, req.params.email)
    const message = 'Reserva realizada con exito'
    const response = { message }
    logger.info({ message, data: JSON.stringify(response) })
    res.status(201).json(response)
  } catch (error) {
    console.log('error: ', error.message)
    next(error)
  }
})

router.delete(`/Users/v1/reservations/:id`, async (req, res, next) => {
  try {
    await deleteReservationService.execute(req.params.id)
    const message = 'Reserva cancelada con exito'
    const response = { message }
    logger.info({ message, data: JSON.stringify(response) })
    res.status(200).json(response)
  } catch (error) {
    console.log('error: ', error.message)
    next(error)
  }
})

router.get(`/Users/v1/users/:email/reservations`, async (req, res, next) => {
  try {
    const reservations = await listReservationService.execute(req.params.email)

    const response = { reservations }
    logger.info({ message: 'Reservas obtenidas', data: JSON.stringify(response) })
    res.status(200).json(response)
  } catch (error) {
    console.log('error: ', error.message)
    next(error)
  }
})

module.exports = router
