import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

/**
 * Retrieves data of the user provided 
 * 
 * @param {string} id unique id that identifies the user
 * 
 * @returns {object} data of the provided user
 * 
 * @throws {NotAllowedError} on wrong data
 */

export default (function () {
    return (async () => {
        const response = await fetch(`${API_URL}/users/friends`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const userFriends = await response.json()

            return userFriends
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