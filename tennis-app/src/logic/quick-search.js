import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Searchs for the first court available 
 * 
 * @param {string} userId user's id that wants to cancel the booking
 * @param {string} bookingId book id of the booking that the user wants to cancel
 * 
 * @returns first book available following user preferences 
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

export default (function (hour) {
    return (async () => {
        const response = await fetch(`${API_URL}/users/bookings-quick`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({hour})
        })

        const { status } = response

        if (status === 200) {
            const book = await response.json()

            return book
        }

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