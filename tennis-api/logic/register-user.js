const { validate } = require('../../tennis-utils')
const { models: { User } } = require('../../tennis-data')
const { NotAllowedError } = require('../../tennis-errors')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

/**
 * Adds a user to the database 
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's email, unique
 * @param {string} password user's password for login in his account

 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    let memberNumber_

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`User with email ${email} already exists`)
            return bcrypt.hash(password, 10)
        })
        .then(nPassword => {
            password = nPassword
            return User.estimatedDocumentCount()
        })
        .then(memberNumber => {
            memberNumber += 1
            memberNumber_ = memberNumber
            user = new User({ name, surname, memberNumber , email, password, created: new Date})
            return user.save()
        })
        .then(() => {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'info.break.point.club@gmail.com',
                    pass: 'breakpoint123'
                }
            })
                mailOptions = {
                    from: 'Break Point',
                    to: `${email}`,
                    subject: 'Welcome to Break Point Club',
                    text: `Dear ${name}, \n\nWelcome to our tennis club! You have registered successfully. \n\nYour member number is: ${memberNumber_}. You can login in our membership area using your email address or you member number. Let's play!\n\nContact us for any problem\nTN: 111 222 3333\nEmail: info.break.point.club@gmail.com\nOffice: Street 11, nº22, Barcelona (8-18h)`
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) throw new Error("Email not sent")
                })
        })
        .then(() => { })
}