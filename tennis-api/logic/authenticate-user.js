const { validate } = require('tennis-utils')
const { models: { User } } = require('tennis-data')
const { NotAllowedError } = require('tennis-errors')
const bcrypt = require('bcryptjs')
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


/**
 * Checks user credentials against the storage
 * 
 * @param {string} userMember user's unique member number or email 
 * @param {string} password user's password
 * 
 * @returns {Promise<string>} user id from storage
 * 
 * @throws {NotAllowedError} on wrong credentials
 */
module.exports = (userMember, password) => {
    let body
    validate.string(userMember, 'userMember')
    if (EMAIL_REGEX.test(userMember)){
        body = {email: userMember}
    }
    else{
        body = {memberNumber: userMember}
    }

    validate.string(password, 'password')

    return User.findOne(body)
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)
            return bcrypt.compare(password, user.password)

                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError(`wrong credentials`)

                    user.authenticated = new Date

                    return user.save()
                })
                .then(({ id }) => id)
        })
}