const { validate } = require('../../tennis-utils')
const { models: { User, Booking } } = require('../../tennis-data')
const { NotAllowedError } = require('../../tennis-errors')
const nodemailer = require('nodemailer')


/**
 * Cancels a book 
 * 
 * @param {string} userId user's id that wants to cancel the booking
 * @param {string} bookingId book id of the booking that the user wants to cancel
 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

module.exports = (userId, bookingId) => {
    validate.string(userId, 'userId')
    validate.string(bookingId, 'bookingId')
    let usersArray_
    let date_
    let court_

    return User.findOne({ _id: userId, bookings: bookingId })
        .then(correct => {
            if (correct) {
                return User.find({ bookings: bookingId })
            }
            else {
                throw new NotAllowedError('This user cannot cancel this book')
            }
        })
        .then(usersArray => {
            usersArray_ = usersArray
            return usersArray.forEach(async user => await User.findByIdAndUpdate(user.id, { $pull: { bookings: bookingId } }))
        })
        .then(() => Booking.findById(bookingId))
        .then(book => {
            console.log(book)
            date_ = book.date
            court_ = book.court.number
            return Booking.findByIdAndRemove(bookingId)
        })
        .then(() => {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info.break.point.club@gmail.com',
                    pass: 'breakpoint123'
                }
            })
            usersArray_.forEach(user =>{
                mailOptions = {
                    from: 'Break Point',
                    to: `${user.email}`,
                    subject: 'Booking cancelled',
                    text: `Your booking for ${date_.toLocaleDateString()} at ${date_.getHours()}h of court ${court_} has been cancelled. \n\nContact us for any problem\nTN: 111 222 3333\nEmail: info.break.point.club@gmail.com\nOffice: Street 11, nº22, Barcelona (8-18h)`
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) throw new Error ('Mail not sent')
                })
            })
        })
        .then(() => {})
}