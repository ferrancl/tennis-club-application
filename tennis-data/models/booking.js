const mongoose = require('mongoose')
const { booking } = require('../schemas')

module.exports = mongoose.model('Booking', booking)