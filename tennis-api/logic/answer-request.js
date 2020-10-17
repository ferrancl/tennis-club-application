const { validate } = require('../../tennis-utils')
const { models: { User } } = require('../../tennis-data')
const { NotAllowedError } = require('../../tennis-errors')
const nodemailer = require('nodemailer')


/**
 * Cancels a book 
 * 
 * @param {string} userId user's id that wants answer the request
 * @param {string} user2 user that has made the request
 * @param {string} answer (optional) exists if the request is positive
 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

module.exports = (userId, user2, answer) => {
    validate.string(userId, 'userId')
    validate.string(user2, 'user2')
    if (answer) validate.string(answer, 'answer')
    let user1_
    let user2__

    return Promise.all([User.findById(userId), User.findOne({ memberNumber: user2 })])
        .then(result => {
            const [user1, user2_] = result
            user1_ = user1
            user2__ = user2_
            return Promise.all([User.findByIdAndUpdate(userId, { $pull: { invitations: user2_.id } }), User.findByIdAndUpdate(user2_.id, { $pull: { requests: userId } })])
        })
        .then(() => {
            if (answer === "yes"){
                user1_.friends.push(user2__.id)
                user2__.friends.push(user1_.id)
                return Promise.all([user1_.save(), user2__.save()])
            }
            else return   
        })
        .then(() => {})
}