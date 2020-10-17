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


export default (function (user2, user3, user4, number, date ) {
    validate.string(user2, 'user2')
    if (user3){
        validate.string(user3, 'user3')
    }
    if(user4){
        validate.string(user4, 'user4')
    }
    if (user3 === "Member 3") user3 = undefined
    if (user4 === "Member 4") user4 = undefined
    validate.string(number,  'number')
    validate.string(date, 'date')

    return (async () => {
        const response = await fetch(`${API_URL}/users/bookings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ user2, user3, user4, number, date })
        })

        const { status } = response

        if (status === 201) return "Book done sucessfully!"

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