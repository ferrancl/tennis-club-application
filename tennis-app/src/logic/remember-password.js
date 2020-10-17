import { validate } from 'tennis-utils'
const { NotAllowedError } = require('tennis-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Reassign a password to the user's account, that is sended to his email address
 * 
 * @param {string} email user's email, unique
 * 
 * @returns 
 * 
 * @throws {NotFoundError} on not found data
 */

export default function (email) {
    validate.string(email, 'email')
    validate.email(email)

    return (async () => {
        const response = await fetch(`${API_URL}/users/remember`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email})
        })

        const { status } = response

        if (status === 200) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}