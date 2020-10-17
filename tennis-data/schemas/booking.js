const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    users: {type: [{ type: ObjectId, ref: 'User'}], required: true},
    date: { type: Date, required: true , timestamps: true},
    day: { type: String, required: true},
    status: { type: String, required: true},
    court: { type: { ref: 'Court' }, required: true},
})
