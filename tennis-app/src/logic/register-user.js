import { validate } from 'tennis-utils'
const { NotAllowedError } = require('tennis-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Adds a user to the database 
 * 
 * @param {string} name user's name
 * @param {string} surname user's surname
 * @param {string} email user's email, unique
 * @param {string} password user's password for login in his account
 * @param {string} confirmPassword user's password for login in his account, must be the same as password


 * 
 * @returns 
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

export default function (name, surname, email, password, confirmPassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')
    validate.string(confirmPassword, 'confirmPassword')

    if (password !== confirmPassword) throw new NotAllowedError ("The Confirm Password does not match")

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        const { status } = response

        if (status === 201) return

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