import React, { useState, useEffect } from 'react'
import './style/Form.sass'
import './style/Friends.sass'
import Feedback from './Feedback'
import { retrieveUserFriends } from '../logic'

export default function ({ onAnswer, error }) {
    const [requests, setRequests] = useState([])
    const [invitations, setInvitations] = useState([])

    useEffect(() => {
        (async () => {
            const [, requests, invitations]  = await retrieveUserFriends()
            setRequests(requests)
            setInvitations(invitations)
        })()
    }, [])


    function handleAnswer(event) {
        event.preventDefault()

        
        const [user2, answer] = event.target.value.split(',')
        
        onAnswer(user2, answer)
    }

    return <>
        <div className="friends">
            <form className="form" id="book">
                <h3 className="friends_title">REQUESTS RECEIVED</h3>
                {invitations.length>0? invitations.map(invitation => <div className="friends_friend"><p className="friends_text">{invitation.name.toUpperCase()} {invitation.surname.toUpperCase()}</p><div><button className="friends_button" type="submit" value={[invitation.memberNumber,"yes"]} onClick={handleAnswer}>ACCEPT</button><button className="friends_decline" type="submit" value={[invitation.memberNumber,"no"]} onClick={handleAnswer}>DECLINE</button></div></div>): <p className="friends_noItem">No requests received</p>}
                {error && <Feedback message={error} level="warn" />}
            </form>
            <div className="form" id="book">
                <h3 className="form_title">REQUESTS PENDING OF CONFIRMATION</h3>
                {requests.length>0? requests.map(request => <div className="friends_friend"><p className="friends_text">{request.name.toUpperCase()} {request.surname.toUpperCase()}</p><p className="friends_text">Member Number: {request.memberNumber}</p></div>): <p className="friends_noItem">No requests pending of confirmation</p>}
            </div>
        </div>
        </>     
}

