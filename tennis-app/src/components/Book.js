import React, { useState, useEffect } from 'react'
import './style/Form.sass'
import './style/Book.sass'
import Feedback from './Feedback'
import { retrieveUserFriends } from '../logic'
import { useForm } from '../hooks/useForm'

export default function ({onSubmit, searchDay, error, message}) {
    const [players, setPlayers] = useState("2")
    const [friends, setFriends] = useState([])
    const [{hour, court, user2, user3, user4}, handleInputChange] = useForm({
        hour: '',
        court: '',
        user2: ''
    })

    useEffect(() => {
        (async () => {
            const [friends , , ]  = await retrieveUserFriends()
            setFriends(friends)
        })()
    }, [])

    function handleChange({target: {value}}){
        setPlayers(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        let date

        date =  `${searchDay} ${hour}`
        onSubmit(user2, user3, user4, court, date)
    }

    const options = []

    for (let i=0; i<14; i++){  
        let n=8;
        n += i 
        options.push(<option value= {n<10? `0${n}:00`: `${n}:00`}>
            {n}-{n+1}h    
        </option>)
    }

    const courts = [1,2,3,4,5,6,7,8,9,10]

    return <>
            <form className="form" id="book" onSubmit={handleSubmit}>               
                    <select 
                        className="form_select" 
                        name="hour" 
                        id="hour" 
                        form="book"
                        value={hour}
                        onChange={handleInputChange}
                    >
                        <option disabled selected>Hour</option>
                        {options}
                    </select>

                    <select 
                        className="form_select" 
                        name="court" 
                        id="court" 
                        form="book"
                        value={court}
                        onChange={handleInputChange}
                    >
                        <option disabled selected>Court</option>
                        {courts.map(court => <option value={court}>{court}</option>)}
                    </select>

                    <select 
                        className="form_select" 
                        name="players" 
                        id="players" 
                        form="book" 
                        onChange={handleChange}
                    >
                        <option disabled selected>Number of players</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select 
                        className="form_select" 
                        name="user2" 
                        id="user2" 
                        form="book"
                        value={user2}
                        onChange={handleInputChange}
                    >
                        <option disabled selected>Member 2</option>
                        {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>

                    <select 
                        className={players === "2"? 'hidden':'form_select'} 
                        name="user3" 
                        id="user3"
                        form="book"
                        onChange={handleInputChange}
                        value={user3}
                    >
                        <option disabled selected>Member 3</option>
                        {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>

                    <select 
                        className={players === "2"? 'hidden':'form_select'} 
                        name="user4" 
                        id="user4" 
                        form="book"
                        value={user4}
                        onChange={handleInputChange}
                    >
                    <option disabled selected>Member 4</option>
                    {friends.map(friend => <option value={friend.memberNumber}>{friend.memberNumber} ({friend.name} {friend.surname})</option>)}
                    </select>
                    <button className="form_button" type="submit" name="submit" value="submit">BOOK</button>
                    {message && <Feedback message={message} level="info" />}
                    {error && <Feedback message={error} level="warn" />}
            </form>
        </>     

}