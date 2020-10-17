import React, { useEffect } from 'react'
import './style/Form.sass'
import Feedback from './Feedback'
import { useForm } from '../hooks/useForm'

export default function ({ onSubmit, error }) {

    const [{name, surname, email, password, confirmPassword}, 
        handleInputChange] = useForm({
            name:'', surname: '', email: '', password:'', confirmPassword: ''
    })

    function handleSubmit(event) {
        event.preventDefault()

        onSubmit(name, surname, email, password, confirmPassword)
    }

    return <>
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form_title">REGISTER</h3>
                <input type="text" className="form_input" id="name" name="name" placeholder="Name" value={name} onChange={handleInputChange}/>
                <input type="text" className="form_input" id="surname" name="surname" placeholder="Surname" value={surname} onChange={handleInputChange}/>
                <input type="text" className="form_input" id="email" name="email" placeholder="Email" value={email} onChange={handleInputChange}/>
                <input type="password" className="form_input" id="password" name="password" placeholder="Password" value={password} onChange={handleInputChange}/>
                <input type="password" className="form_input" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange}/>
                <button type="submit" className="form_button">SIGN UP</button>
                {error && <Feedback message={error} level="warn" />}
            </form>
    </>
}