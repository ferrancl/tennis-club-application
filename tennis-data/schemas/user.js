const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    memberNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    bookings: {type: [{ type: ObjectId, ref: 'Booking' }]},
    friends: {type: [{ type: ObjectId, ref: 'User'}]},
    requests:  {type: [{ type: ObjectId, ref: 'User'}]},
    invitations:  {type: [{ type: ObjectId, ref: 'User'}]}
})