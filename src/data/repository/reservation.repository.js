'use strict'
const MySqlClient = require('../database/my-sql/client')
const MySqlRunner = require('../database/my-sql/runner')
const sqlProcedures = require('../database/my-sql/sql_procedures')

const insertReservation = async (reservation, email) => {
  try {
    const mySqlClient = await MySqlClient.getInstance()
    const procedure = sqlProcedures.insertReservation(reservation, email)
    const sqlRunner = new MySqlRunner(mySqlClient)
    const result = await sqlRunner.runProcedure(procedure)
    console.log(JSON.stringify(result))
    return result.pop()[0]
  } catch (error) {
    throw error
  }
}

const deleteReservation = async (id) => {
  try {
    const mySqlClient = await MySqlClient.getInstance()
    const procedure = sqlProcedures.deleteReservation(id)
    const sqlRunner = new MySqlRunner(mySqlClient)
    const result = await sqlRunner.runProcedure(procedure)
    console.log(JSON.stringify(result))
    return result.pop()[0]
  } catch (error) {
    throw error
  }
}

const listReservations = async (email) => {
  try {
    const mySqlClient = await MySqlClient.getInstance()
    const procedure = sqlProcedures.listReservations(email)
    const sqlRunner = new MySqlRunner(mySqlClient)
    const result = await sqlRunner.runProcedure(procedure)
    console.log(JSON.stringify(result))
    return result.pop()[0]
  } catch (error) {
    throw error
  }
}

module.exports = { insertReservation, deleteReservation, listReservations }
