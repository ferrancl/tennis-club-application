import React, { useEffect } from 'react'
import './style/Form.sass'
import './style/Login.sass'
import Feedback from './Feedback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../hooks/useForm'

export default function ({ onSubmit, onGoToRememberPassword, error }) {

    const  [{userMember, password}, handleInputChange ] = useForm({
        userMember: '', password: ''
    })

    function handleGoToRememberPassword(event) {
        event.preventDefault()
        onGoToRememberPassword()
    }

    function handleSubmit(event) {
        event.preventDefault()

        onSubmit(userMember, password)
    }

    return <div className="login">
        <form className="form" onSubmit={handleSubmit}>
            <FontAwesomeIcon className="login_icon" icon={faUser} size="5x"  color="rgba(105, 105, 105, 0.99)"/>
            <input 
                type="text" 
                className="form_input" 
                id="userMember" 
                name="userMember" 
                placeholder="Member Number/Email" 
                value={userMember} 
                onChange={handleInputChange}
            />
            <input 
                type="password" 
                className="form_input" 
                id="password" 
                name="password" 
                placeholder="Password" 
                value={password}
                onChange={handleInputChange}
            />
            <button type="submit" className="form_button">SIGN IN</button>
            {error && <Feedback message={error} level="warn" />}
            <a href="" className="form_anchor" onClick={handleGoToRememberPassword}>FORGOT YOUR PASSWORD?</a>
        </form>
    </div>
}
