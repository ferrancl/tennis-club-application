import React, { useEffect } from 'react'
import './style/Header.sass'
import './style/Results.sass'

export default function ({ bookedCourts, searchDay, error}) {
    let now = new Date(Date.now())
    let currentDay = now.getMonth()+1+"/"+now.getDate()+"/"+now.getFullYear()
    let currentHour = now.getHours()
    return <>
        <table className="tg">
            <thead>
                <tr>
                    <th className=""></th>
                    <th colspan='14' className="hour_title">HOUR</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className=""></td>
                    <td className="hour">8</td>
                    <td className="hour">9</td>
                    <td className="hour">10</td>
                    <td className="hour">11</td>
                    <td className="hour">12</td>
                    <td className="hour">13</td>
                    <td className="hour">14</td>
                    <td className="hour">15</td>
                    <td className="hour">16</td>
                    <td className="hour">17</td>
                    <td className="hour">18</td>
                    <td className="hour">19</td>
                    <td className="hour">20</td>
                    <td className="hour">21</td>
                </tr>
            <tr>
                <td className="clay">1</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_odd': bookedCourts.includes('1-8')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_odd': bookedCourts.includes('1-9')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_odd': bookedCourts.includes('1-10')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_odd': bookedCourts.includes('1-11')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_odd': bookedCourts.includes('1-12')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_odd': bookedCourts.includes('1-13')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_odd': bookedCourts.includes('1-14')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_odd':bookedCourts.includes('1-15')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_odd': bookedCourts.includes('1-16')? 'red': 'green_odd'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_odd':bookedCourts.includes('1-17')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_odd':bookedCourts.includes('1-18')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_odd':bookedCourts.includes('1-19')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_odd':bookedCourts.includes('1-20')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_odd':bookedCourts.includes('1-21')? 'red': 'green_odd'}></td>
            </tr>
            <tr>
                <td className="clay">2</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_couple': bookedCourts.includes('2-8')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_couple': bookedCourts.includes('2-9')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_couple': bookedCourts.includes('2-10')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_couple': bookedCourts.includes('2-11')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_couple': bookedCourts.includes('2-12')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_couple': bookedCourts.includes('2-13')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_couple': bookedCourts.includes('2-14')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_couple':bookedCourts.includes('2-15')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_couple': bookedCourts.includes('2-16')? 'red': 'green_couple'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_couple':bookedCourts.includes('2-17')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_couple':bookedCourts.includes('2-18')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_couple':bookedCourts.includes('2-19')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_couple':bookedCourts.includes('2-20')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_couple':bookedCourts.includes('2-21')? 'red': 'green_couple'}></td>

            </tr>
            <tr>
                <td className="clay">3</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_odd': bookedCourts.includes('3-8')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_odd': bookedCourts.includes('3-9')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_odd': bookedCourts.includes('3-10')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_odd': bookedCourts.includes('3-11')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_odd': bookedCourts.includes('3-12')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_odd': bookedCourts.includes('3-13')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_odd': bookedCourts.includes('3-14')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_odd':bookedCourts.includes('3-15')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_odd': bookedCourts.includes('3-16')? 'red': 'green_odd'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_odd':bookedCourts.includes('3-17')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_odd':bookedCourts.includes('3-18')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_odd':bookedCourts.includes('3-19')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_odd':bookedCourts.includes('3-20')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_odd':bookedCourts.includes('3-21')? 'red': 'green_odd'}></td>
            </tr>
            <tr>
                <td className="clay">4</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_couple': bookedCourts.includes('4-8')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_couple': bookedCourts.includes('4-9')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_couple': bookedCourts.includes('4-10')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_couple': bookedCourts.includes('4-11')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_couple': bookedCourts.includes('4-12')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_couple': bookedCourts.includes('4-13')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_couple': bookedCourts.includes('4-14')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_couple':bookedCourts.includes('4-15')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_couple': bookedCourts.includes('4-16')? 'red': 'green_couple'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_couple':bookedCourts.includes('4-17')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_couple':bookedCourts.includes('4-18')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_couple':bookedCourts.includes('4-19')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_couple':bookedCourts.includes('4-20')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_couple':bookedCourts.includes('4-21')? 'red': 'green_couple'}></td>
            </tr>
            <tr>
                <td className="clay">5</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_odd': bookedCourts.includes('5-8')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_odd': bookedCourts.includes('5-9')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_odd': bookedCourts.includes('5-10')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_odd': bookedCourts.includes('5-11')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_odd': bookedCourts.includes('5-12')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_odd': bookedCourts.includes('5-13')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_odd': bookedCourts.includes('5-14')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_odd':bookedCourts.includes('5-15')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_odd': bookedCourts.includes('5-16')? 'red': 'green_odd'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_odd':bookedCourts.includes('5-17')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_odd':bookedCourts.includes('5-18')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_odd':bookedCourts.includes('5-19')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_odd':bookedCourts.includes('5-20')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_odd':bookedCourts.includes('5-21')? 'red': 'green_odd'}></td>
            </tr>
            <tr>
                <td className="hard">6</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_couple': bookedCourts.includes('6-8')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_couple': bookedCourts.includes('6-9')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_couple': bookedCourts.includes('6-10')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_couple': bookedCourts.includes('6-11')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_couple': bookedCourts.includes('6-12')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_couple': bookedCourts.includes('6-13')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_couple': bookedCourts.includes('6-14')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_couple':bookedCourts.includes('6-15')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_couple': bookedCourts.includes('6-16')? 'red': 'green_couple'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_couple':bookedCourts.includes('6-17')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_couple':bookedCourts.includes('6-18')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_couple':bookedCourts.includes('6-19')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_couple':bookedCourts.includes('6-20')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_couple':bookedCourts.includes('6-21')? 'red': 'green_couple'}></td>
            </tr>
            <tr>
                <td className="hard">7</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_odd': bookedCourts.includes('7-8')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_odd': bookedCourts.includes('7-9')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_odd': bookedCourts.includes('7-10')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_odd': bookedCourts.includes('7-11')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_odd': bookedCourts.includes('7-12')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_odd': bookedCourts.includes('7-13')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_odd': bookedCourts.includes('7-14')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_odd':bookedCourts.includes('7-15')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_odd': bookedCourts.includes('7-16')? 'red': 'green_odd'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_odd':bookedCourts.includes('7-17')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_odd':bookedCourts.includes('7-18')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_odd':bookedCourts.includes('7-19')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_odd':bookedCourts.includes('7-20')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_odd':bookedCourts.includes('7-21')? 'red': 'green_odd'}></td>
            </tr>
            <tr>
                <td className="hard">8</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_couple': bookedCourts.includes('8-8')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_couple': bookedCourts.includes('8-9')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_couple': bookedCourts.includes('8-10')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_couple': bookedCourts.includes('8-11')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_couple': bookedCourts.includes('8-12')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_couple': bookedCourts.includes('8-13')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_couple': bookedCourts.includes('8-14')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_couple':bookedCourts.includes('8-15')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_couple': bookedCourts.includes('8-16')? 'red': 'green_couple'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_couple':bookedCourts.includes('8-17')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_couple':bookedCourts.includes('8-18')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_couple':bookedCourts.includes('8-19')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_couple':bookedCourts.includes('8-20')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_couple':bookedCourts.includes('8-21')? 'red': 'green_couple'}></td>
            </tr>
            <tr>
                <td className="hard">9</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_odd': bookedCourts.includes('9-8')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_odd': bookedCourts.includes('9-9')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_odd': bookedCourts.includes('9-10')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_odd': bookedCourts.includes('9-11')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_odd': bookedCourts.includes('9-12')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_odd': bookedCourts.includes('9-13')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_odd': bookedCourts.includes('9-14')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_odd':bookedCourts.includes('9-15')? 'red': 'green_odd'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_odd': bookedCourts.includes('9-16')? 'red': 'green_odd'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_odd':bookedCourts.includes('9-17')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_odd':bookedCourts.includes('9-18')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_odd':bookedCourts.includes('9-19')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_odd':bookedCourts.includes('9-20')? 'red': 'green_odd'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_odd':bookedCourts.includes('9-21')? 'red': 'green_odd'}></td>
            </tr>
            <tr>
                <td className="hard">10</td>
                <td className={(searchDay === currentDay && 8<currentHour)? 'gray_couple': bookedCourts.includes('10-8')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 9<currentHour)? 'gray_couple': bookedCourts.includes('10-9')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 10<currentHour)? 'gray_couple': bookedCourts.includes('10-10')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 11<currentHour)? 'gray_couple': bookedCourts.includes('10-11')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 12<currentHour)? 'gray_couple': bookedCourts.includes('10-12')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 13<currentHour)? 'gray_couple': bookedCourts.includes('10-13')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 14<currentHour)? 'gray_couple': bookedCourts.includes('10-14')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 15<currentHour)?'gray_couple':bookedCourts.includes('10-15')? 'red': 'green_couple'}></td>                
                <td className={(searchDay === currentDay && 16<currentHour)?'gray_couple': bookedCourts.includes('10-16')? 'red': 'green_couple'}></td>               
                <td className={(searchDay === currentDay && 17<currentHour)?'gray_couple':bookedCourts.includes('10-17')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 18<currentHour)?'gray_couple':bookedCourts.includes('10-18')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 19<currentHour)?'gray_couple':bookedCourts.includes('10-19')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 20<currentHour)?'gray_couple':bookedCourts.includes('10-20')? 'red': 'green_couple'}></td>
                <td className={(searchDay === currentDay && 21<currentHour)?'gray_couple':bookedCourts.includes('10-21')? 'red': 'green_couple'}></td>
            </tr>    
        </tbody>
    </table>
</>
}