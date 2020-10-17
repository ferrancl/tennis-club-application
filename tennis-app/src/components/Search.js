import React, { useState, useEffect, useContext } from 'react'
import Results from './Results'
import './style/Form.sass'
import './style/Legend.sass'
import './style/Notes.sass'
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'
import Book from './Book'
const moment = require('moment')


export default withRouter(function ({ onSubmit, onSubmitWeather, error, bookedCourts, handleBook, weather, message }) {
    const [, setState] = useContext(Context)
    const [day, setDay] = useState([])
    const [searchDay, setSearchDay] = useState()
    
    useEffect(() => {
        let currentTimeWeather
        let day1 = moment().format("M/D/YYYY")
        let day2 = moment().add(1, 'days').format("M/D/YYYY")
        let day3 = moment().add(2, 'days').format("M/D/YYYY")

        if (moment().hours() < 12) currentTimeWeather = moment().set({'hour': 12, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
        if (moment().hours() >= 12 && moment().hours() < 18) currentTimeWeather = moment().set({'hour': 18, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
        if (moment().hours() >= 18 && moment().hours() < 21) currentTimeWeather = moment().set({'hour': 21, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
        if (moment().hours() >= 21){
            currentTimeWeather = moment().set({'hour': 0, 'minute': 0, 'second': 0})
            currentTimeWeather = currentTimeWeather.add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
        }

        setSearchDay(day1)
        setDay([day1, day2, day3])
        onSubmit(day1)
        onSubmitWeather(currentTimeWeather)
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        let dateWeather
        if (event.target.value === day[0]){
            if (moment().hours() < 12) dateWeather = moment().set({'hour': 12, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
            if (moment().hours() > 12 && moment().hours() < 18) dateWeather = moment().set({'hour': 18, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
            if (moment().hours() >= 18 && moment().hours() < 21) dateWeather = moment().set({'hour': 21, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
            if (moment().hours() >= 21){
                dateWeather = moment().set({'hour': 0, 'minute': 0, 'second': 0})
                dateWeather = dateWeather.add(1, 'days').format("YYYY-MM-DD HH:mm:ss")
            }
        }
        else{
            if (event.target.value === day[1]){
                dateWeather = moment().add(1, 'days')
            }
            if (event.target.value === day[2]){
                dateWeather = moment().add(2, 'days')
            }
            dateWeather = dateWeather.set({'hour': 12, 'minute': 0, 'second': 0}).format("YYYY-MM-DD HH:mm:ss")
        }
        setSearchDay(event.target.value)
        onSubmit(event.target.value)
        onSubmitWeather(dateWeather)
    }

    return <>
        <div className="search">
            <div className="table">
                <div className="dayWeather">
                <select  className="dayWeather_day" name="day" id="day" form="day" onChange={handleSubmit}>
                    {day.map(date => <option id="day" value={date}>{date}</option>)}
                </select>
                    <img className={weather === undefined? "hidden": "weather"} src={`http://openweathermap.org/img/wn/${weather}@2x.png`}/>
                </div>
                <Results bookedCourts={bookedCourts} searchDay={searchDay} />
            </div>
            <div className="doBook">
                <div className="legend">
                    <div className="legend_court">
                        <div className="legend_clay"></div>
                        <span className="">Clay Court</span>
                    </div>
                    <div className="legend_court">
                        <div className="legend_hard"></div>
                        <span className="">Hard Court</span>
                    </div>
                    <div className="legend_court">
                        <div className="legend_available"></div>
                        <span className="">Available</span>
                    </div>
                    <div className="legend_court">
                        <div className="legend_reserved"></div>
                        <span className="">Reserved</span>
                    </div>
                </div>
                <div className="notes">
                    <p className="notes_text"><sup>*</sup> Bookings only allowed for the next 2 days and 1h/booking</p>
                    <p className="notes_text"><sup>**</sup> Only 2 bookings/day allowed per member</p>
                    <p className="notes_text"><sup>***</sup> Not allowed 2 bookings at the same time per member</p>
                </div>
                <Book onSubmit={handleBook} searchDay={searchDay} error={error} message={message}/>
            </div>
        </div>
    </>
})