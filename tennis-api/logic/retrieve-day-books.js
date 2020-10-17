const { models: { Booking } } = require('tennis-data')

/**
 * Retrieves bookings of the day provided 
 * 
 * @param {string} day day that the user wants to see the bookings
 * 
 * @returns {Promise<string>} books of the day
 * 
 * @throws {NotFoundError} on not found data
 */

module.exports = (day) => {

    return Booking.find({day})
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