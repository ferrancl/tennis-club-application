const { validate } = require('../../tennis-utils')
const { models: { User } } = require('../../tennis-data')
const { NotFoundError } = require('../../tennis-errors')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

/**
 * Reassign a password to the user's account, that is sended to his email address
 * 
 * @param {string} email user's email, unique
 * 
 * @returns {Promise}
 * 
 * @throws {NotFoundError} on not found data
 */

module.exports = (email) => {
    validate.string(email, 'email')
    validate.email(email)

    let transporter
    let mailOptions
    let password_

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new NotFoundError('Email not registered')
            password_ = (Math.floor(Math.random() * (9999999 - 1)) + 1).toString()
            return bcrypt.hash(password_, 10)
                .then(newPassword => {
                    return User.findOneAndUpdate({ email }, { $set: { password: newPassword } })
                        .then(user => {
                            return user.save()
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
                                        subject: 'Password for online access',
                                        text: `You have asked for a new password. Your new password is: ${password_}. You can change it in settings. \n\nContact us for any problem\nTN: 111 222 3333\nEmail: info.break.point.club@gmail.com\nOffice: Street 11, nº22, Barcelona (8-18h)`
                                    }
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) throw new Error("Email not sent")
                                    })
                                })
                        })
                })

        })
        .then(() => { })
}