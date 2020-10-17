import { validate } from 'tennis-utils'
import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Checks user credentials against the storage
 * 
 * @param {string} userMember user's unique member number or email 
 * @param {string} password user's password
 * 
 * @returns 
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

export default (function (userMember, password) {
    validate.string(userMember, 'email')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMember, password })
        })

        const { status } = response

        if (status === 200) {
            const { token } = await response.json()
            
            this.token = token

            return
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