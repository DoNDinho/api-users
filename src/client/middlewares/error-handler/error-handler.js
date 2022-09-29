'use strict'
const errorHandler = (error, res) => {
	const { httpCode, message } = error
	logger.error(error)
	res.status(httpCode).json({ message })
}

module.exports = { errorHandler }
