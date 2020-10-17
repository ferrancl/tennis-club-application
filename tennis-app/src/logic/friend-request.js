import { NotAllowedError } from 'tennis-errors'
import context from './context'
import { validate } from 'tennis-utils'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Checks user credentials against the storage
 * 
 * @param {string} idUser1 user's id that is doing the friend request 
 * @param {string} user2 user's member number that is inviting user1
 * @param {string} name2 user's member number 2 name
 * @param {string} surname2 user's member number 2 surname
 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

export default (function (user2, name2, surname2) {
    validate.string(user2, 'user2')
    validate.string(name2, 'name2')
    validate.string(surname2, 'surname2')

    return (async () => {
        const response = await fetch(`${API_URL}/users/friend-request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ user2, name2, surname2 })
        })

        const { status } = response

        if (status === 201) return 

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)