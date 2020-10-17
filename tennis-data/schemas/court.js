const { Schema } = require('mongoose')

module.exports = new Schema({
    name: { type: String},
    number: {type: String, required: true},
    surface: { type: String, required: true },
})