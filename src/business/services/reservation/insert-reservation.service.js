'use strict'
const reservationRepository = require('../../../data/repository/reservation.repository')

const execute = async (reservation, email) => {
  try {
    await insertReservation(reservation, email)
  } catch (error) {
    throw error
  }
}

const insertReservation = async (reservation, email) => {
  try {
    const result = await reservationRepository.insertReservation(reservation, email)
    return result
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

module.exports = { execute }
