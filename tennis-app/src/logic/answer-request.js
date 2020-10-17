import { NotAllowedError } from 'tennis-errors'
import context from './context'
import { validate } from 'tennis-utils'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Books a court 
 * 
 * @param {string} user2 user 2 unique member number
 * @param {string} user3 user 3 unique member number (optional)
 * @param {string} user4 user 4 unique member number (optional)
 * @param {string} number number that identifies the court
* @param {string} date date for the booking of the court
 
 * 
 * @returns 
 * 
 * @throws {NotAllowedError} on wrong credentials
 * @throws {NotFoundError} when not found data
 */


export default (function (user2, answer) {
    validate.string(user2, 'user2')
    validate.string(answer, 'answer')

    return (async () => {
        const response = await fetch(`${API_URL}/users/answer-request/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ user2, answer })
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