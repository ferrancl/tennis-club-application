const { validate } = require('../../tennis-utils')
const { models: { User, Booking, Court } } = require('../../tennis-data')
const { NotFoundError, NotAllowedError } = require('../../tennis-errors')
const moment = require('moment')
moment().format()
const nodemailer = require('nodemailer')

/**
 * Books a court 
 * 
 * @param {string} idUser1 user's id that is doing the booking
 * @param {string} user2 user 2 unique member number
 * @param {string} user3 user 3 unique member number (optional)
 * @param {string} user4 user 4 unique member number (optional)
 * @param {string} number number that identifies the court
* @param {string} date date for the booking of the court
 
 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 * @throws {NotFoundError} when not found data
 */


module.exports = (idUser1, user2, user3, user4, number, date) => {
    validate.string(idUser1, 'idUser1')
    validate.string(user2, 'user2')
    if (user3) validate.string(user3, 'user3')
    if (user4) validate.string(user4, 'user4')

    validate.string(number, 'number')

    date = new Date(date)

    validate.type(date, 'date', Date)
    const dateWithoutHour = date.toLocaleDateString()

    let limitTime = new Date()
    limitTime.setHours(limitTime.getHours()-1)

    if (date < limitTime) {
        throw new NotAllowedError('Invalid hour')
    }
    if (user3 && !user4){
        throw new NotAllowedError('Please enter the user member number of the 4th player')
    }

    if (!user3 && user4){
        throw new NotAllowedError('Please enter the user member number of the 3rd player')
    }

    let usersArray = []
    let booking
    let user4_
    let user3_
    let user2_
    let court_
    let user1_

    return Promise.all([User.findById(idUser1), User.findOne({ memberNumber: user2 }), User.findOne({ memberNumber: user3 }), User.findOne({ memberNumber: user4 })])
        .then(result => {
            const [user1, user2Found, user3Found, user4Found] = result
            user1_ = user1
            if (!user2Found) throw new NotFoundError(`User with member number ${user2} not found`)
            user2_ = user2Found
            usersArray.push(user1_, user2_)
            if (user3 && !user3Found) throw new NotFoundError(`User with member number ${user3} not found`)
            user3_ = user3Found
            if (user4 && !user4Found) throw new NotFoundError(`User with member number ${user4} not found`)
            user4_ = user4Found
            if (user1_.memberNumber === user2_.memberNumber) throw new NotAllowedError("Please, check the member number introduced of player 2")
            if (user3_ && user1_.memberNumber === user3_.memberNumber) throw new NotAllowedError("Please, check the member number introduced of player 3")
            if (user4_ && user1_.memberNumber === user4_.memberNumber) throw new NotAllowedError("Please, check the member number introduced of player 4")
            if (user4) usersArray.push(user3_, user4_)   
            return Court.findOne({ number })
        })
        .then(court => {
            court_ = court
            return Booking.findOne({ court: court_, date })
        })

        .then(bookExists => {
            if (bookExists) throw new NotFoundError(`Court ${number} already booked at this time`)
            if (user3 && user4) return Promise.all([Booking.find({users: idUser1, day: dateWithoutHour}), Booking.find({users: user2_.id, day: dateWithoutHour}), Booking.find({users: user3_.id, day: dateWithoutHour}), Booking.find({users: user4_.id, day: dateWithoutHour})])
            else return Promise.all([Booking.find({users: idUser1, day: dateWithoutHour}), Booking.find({users: user2_.id, day: dateWithoutHour})])
        })
        .then(books=> {
            const [book1, book2, book3, book4] = books
            if (book1 != undefined){
                if (book1.length === 1 && book1[0].date.getTime() === date.getTime()) throw new NotAllowedError (`You have already booked a court at the same time`)
                if (book1.length>1) throw new NotAllowedError (`You have already booked 2 courts for ${dateWithoutHour}`)      
            }
            if (book2 != undefined){
                if (book2.length === 1 && book2[0].date.getTime() === date.getTime()) throw new NotAllowedError (`${user2_.name} ${user2_.surname} has already booked a court at the same time`)
                if (book2.length>1) throw new NotAllowedError (`${user2_.name} ${user2_.surname} has already booked 2 courts for ${dateWithoutHour}`)      
            }
            if (book3 != undefined){
                if (book3.length === 1 && book3[0].date.getTime() === date.getTime()) throw new NotAllowedError (`${user3_.name} ${user3_.surname} has already booked a court at the same time`)
                if (book3.length>1) throw new NotAllowedError (`${user3_.name} ${user3_.surname} has already booked 2 courts for ${dateWithoutHour}`)      
            }
            if (book4 != undefined){
                if (book4.length === 1 && book4[0].date.getTime() === date.getTime()) throw new NotAllowedError (`${user4_.name} ${user4_.surname} has already booked a court at the same time`)
                if (book4.length>1) throw new NotAllowedError (`${user4_.name} ${user4_.surname} has already booked 2 courts for ${dateWithoutHour}`)      
            }
            if (user3 && user4){
                booking = new Booking({ users:[idUser1, user2_.id, user3_.id, user4_.id], court: court_, date, day: dateWithoutHour, status: "PRE" })
                user3_.bookings.push(booking.id)
                user4_.bookings.push(booking.id)
                Promise.all([user3_.save(), user4_.save()])
            }
            else{
                booking = new Booking({ users:[idUser1, user2_.id], court: court_, date, day: dateWithoutHour, status: "PRE" })      
            }
            user1_.bookings.push(booking.id)
            user2_.bookings.push(booking.id)
            return Promise.all([user1_.save(), user2_.save(), booking.save()])
        })
        .then(() => {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info.break.point.club@gmail.com',
                    pass: 'breakpoint123'
                }
            })
            usersArray.forEach(user =>{
                mailOptions = {
                    from: 'Break Point',
                    to: `${user.email}`,
                    subject: 'Tennis court booked succesfully',
                    text: `You have booked court ${number} for ${date.toLocaleDateString()} at ${date.getHours()}h. \nYou can view your bookings in your profile.\n\nContact us for any problem\nTN: 111 222 3333\nEmail: info.break.point.club@gmail.com\nOffice: Street 11, nº22, Barcelona (8-18h)`,
              }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) throw new Error("Email not sent")
                })
            })
        })
        .then(() => {})
}