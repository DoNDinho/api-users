'use strict'
const reservationRepository = require('../../../data/repository/reservation.repository')

const execute = async (id) => {
  try {
    await deleteReservation(parseInt(id))
  } catch (error) {
    throw error
  }
}

const deleteReservation = async (id) => {
  try {
    const result = await reservationRepository.deleteReservation(id)
    return result
  } catch (error) {
    throw { httpCode: 422, message: error.message }
  }
}

module.exports = { execute }
