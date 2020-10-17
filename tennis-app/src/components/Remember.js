import React from 'react'
import './style/Form.sass'
import Feedback from './Feedback'
import { useForm } from '../hooks/useForm'

export default function ({ onSubmit, error }) {

    const [{ email }, handleInputChange] = useForm({ email:''})

    function handleSubmit(event) {
        event.preventDefault()

        onSubmit(email)
    }

    return <>
        <form className="form" onSubmit={handleSubmit}>
            <h3 type="text" className="form_title">REMEMBER PASSWORD</h3>
            <input type="text" className="form_input" id="email" name="email" value={email} onChange={handleInputChange} placeholder="Email Address"/>
            <button type="submit" className="form_button">SEND</button>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
}