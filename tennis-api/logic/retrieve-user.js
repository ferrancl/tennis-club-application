const { validate } = require('../../tennis-utils')
const { models: { User } } = require('../../tennis-data')
const { mongoose: { Types: { ObjectId } } } = require('../../tennis-data')

/**
 * Retrieves data of the user provided 
 * 
 * @param {string} id unique id that identifies the user
 * 
 * @returns {Promise<string>} data of the provided user
 * 
 */

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .lean()
        .then(user => {

            user.id = user._id.toString()
            delete user._id
            delete user.__v

            return user
        })
        .then(({ name, surname, memberNumber, email, bookings, friends, requests, invitations }) => ({ name, surname, memberNumber, email, bookings, friends, requests, invitations }))
}