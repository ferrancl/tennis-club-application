import { NotAllowedError } from 'tennis-errors'
import context from './context'
import { validate } from 'tennis-utils'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Update user data
 * 
 * @param {string} email unique email that identifies the user
 * @param {string} oldPassword old password that the user wants to change
 * @param {string} password new password
 * @param {string} confirmPassword confirmation of the new password
 * 
 * @throws {NotAllowedError} on wrong data
 * 
 * @returns {Promise}
 * 
 */


export default (function (email, oldPassword, password, confirmPassword) {
    if (email){
        validate.string(email, 'email')
        validate.email(email)
    }
    if (oldPassword){
        validate.string(oldPassword, 'oldPassword')
        validate.string(password, 'password')
        validate.string(confirmPassword, 'confirmPassword')
    }
    if (password!== confirmPassword) throw new NotAllowedError("The Confirm Password confirmation does not match")

    return (async () => {
        const response = await fetch(`${API_URL}/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ email, oldPassword, password })
        })

        const { status } = response

        if (status === 200) {
            const user = await response.json()

            return user
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