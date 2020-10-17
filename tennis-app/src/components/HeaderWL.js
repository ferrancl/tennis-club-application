import logo from '../utils/logo.png'
import React, { useState, useEffect, useContext } from 'react'
import './style/Header.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function ({ onGoToLogin, onGoToRegister }) {

    const[menu, setMenu] = useState(false)

    function handleGoToRegister(event) {
        event.preventDefault()
        setMenu(false)
        onGoToRegister()
    }

    function handleGoToLogin(event) {
        event.preventDefault()
        setMenu(false)
        onGoToLogin()
    }

    function handleMenu(event){
        event.preventDefault()
        menu ? setMenu(false): setMenu(true)
    }


    return <>
        <header className="header">
            <nav className="header_nav">
                <ul className="header_ul">
                    <li>
                        <a href="">
                            <img src={logo} className="header_icon" alt=""/>
                        </a>
                    </li>
                    <li>
                        <FontAwesomeIcon className="header_icon" icon={faBars} size="2x" color="white" onClick={handleMenu} />
                    </li>
                </ul>
                <ul className={menu ?"header_hidden" : "header_hidden hidden"}>
                    <li>
                        <a href="" className="header_options" onClick={handleGoToLogin}>
                            Sign in
                        </a>
                    </li>
                    <li>
                        <a href="" className="header_options" onClick={handleGoToRegister}>
                            Sign up
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
        </>
}