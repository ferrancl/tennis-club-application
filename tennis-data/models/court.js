const mongoose = require('mongoose')
const { court } = require('../schemas')

module.exports = mongoose.model('Court', court)