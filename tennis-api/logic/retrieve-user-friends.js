const { validate } = require('tennis-utils')
const { models: { User } } = require('tennis-data')

/**
 * Retrieves bookings of the user provided 
 * 
 * @param {string} id unique id that identifies the user
 * 
 * @returns {Promise<string>} books of the provided user
 * 
 */

module.exports = userId => {
    validate.string(userId, 'userId')

    let friendsArray = []
    let requestsArray = []
    let invitationsArray = []

    return Promise.all([User.find({friends: userId}), User.find({invitations: userId}), User.find({requests: userId})])
        .then(result => {
            const [ friends, requests, invitations ] = result

            friends.forEach(friend => { friendsArray.push({name: friend.name, surname: friend.surname, memberNumber: friend.memberNumber})})
            requests.forEach(requestFriend => {requestsArray.push({name: requestFriend.name, surname: requestFriend.surname, memberNumber: requestFriend.memberNumber})})
            invitations.forEach(invitationFriend => {invitationsArray.push({name: invitationFriend.name, surname: invitationFriend.surname, memberNumber: invitationFriend.memberNumber})})

            return [friendsArray, requestsArray, invitationsArray]
        })  
}