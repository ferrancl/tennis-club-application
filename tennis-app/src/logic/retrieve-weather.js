import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()


/**
 * Retrieves weather forecast of the day provided in Barcelona
 * 
 * @param {string} date date of the day that the user wants to check the weather
 * 
 * @returns {string} url of the image for the weather forecast
 * 
 * @throws {NotAllowedError} on wrong data
 */

export default (function (date) {
    return (async () => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=3128760&APPID=fac5259072b40659eb0bd34908c417ce`, {
        })

        const { status } = response

        if (status === 200) {
            let weather
            const weatherData = await response.json()
            weatherData.list.map(element => {
                if (element.dt_txt === date) {
                    weather = element.weather[0].icon
                }
            })
            return weather

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