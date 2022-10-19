'use strict'
const parseReservation = (reservationData) => {
  return {
    id: reservationData.ID_RESERVA_CLI,
    user: {
      name: reservationData.NOMBRE
    },
    number_people: reservationData.CANT_PERSONAS,
    date: {
      name: parseDate(reservationData.FECHA)
    },
    hour: {
      name: reservationData.HORA.substring(0, reservationData.HORA.length - 3)
    }
  }
}

const parseDate = (date) => {
  return date.toISOString().split('T')[0]
}

module.exports = { parseReservation }
