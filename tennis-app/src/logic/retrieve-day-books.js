import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieve day's books of the povided day
 * 
 * @param {string} day day that the user wants to check the bookings
 * 
 * @returns  {Array} books of the provided day
 * 
 * @throws {NotAllowedError} on wrong data
 */

export default (function (day) {
    return (async () => {
        const response = await fetch(`${API_URL}/users/booking-day`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({day})
        })

        const { status } = response

        if (status === 200) {
            const books = await response.json()

            return books
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