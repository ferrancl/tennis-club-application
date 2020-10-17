const { validate } = require('tennis-utils')
const { models: { Booking } } = require('tennis-data')

/**
 * Retrieves bookings of the user provided 
 * 
 * @param {string} id unique id that identifies the user
 * 
 * @returns {Promise<string>} books of the provided user
 * 
 */

module.exports = id => {
    validate.string(id, 'id')

    now = new Date()
    now.setHours(now.getHours()-1)

    return Booking.find({ users: id, date: {$gt: now}}).sort({ date: 1 })
        .lean()
        .then(books => {
            books.forEach(book => {
                book.id = book._id.toString()
                book.court.id = book.court._id.toString()
                delete book._id
                delete book.__v
                delete book.court._id
            })
            
            return books
        })  
}