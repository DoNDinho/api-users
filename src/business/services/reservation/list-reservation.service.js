'use strict'
const reservationRepository = require('../../../data/repository/reservation.repository')
const { parseReservation } = require('../../converter/reservation.converter')

const execute = async (email) => {
  try {
    const reservations = await listReservations(email)
    return reservations.map((reservation) => parseReservation(reservation))
  } catch (error) {
    throw error
  }
}

const listReservations = async (email) => {
  try {
    const result = await reservationRepository.listReservations(email)
    return result
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

module.exports = { execute }
