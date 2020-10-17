import logo from '../utils/logo.png'
import React, { useState, useEffect, useContext } from 'react'
import './style/Header.sass'
import './style/Form.sass'
import { retrieveUser, isLoggedIn, logout } from '../logic'
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default withRouter(function ({ history, onGoToUpdate, onGoToQuick, onGoToMyBooks, onGoToSearch, onGoToRequests, onGoToFriends }) {
    const [, setState] = useContext(Context)
    const [name, setName] = useState()
    const[menu, setMenu] = useState(false)

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const { name } = await retrieveUser()

                    setName(name)

                    setState({ page: 'home' })
                } catch ({ message }) {
                    setState({ error: message, page: 'login' })
                }
            })()
        else setState({ page: 'login' })
    }, [])

    function handleLogout() {
        logout()
        setMenu(false)
    }

    function handleGoToUpdate(event) {
        event.preventDefault()
        setMenu(false)
        onGoToUpdate()
    }

    function handleGoToMyBooks(event) {
        event.preventDefault()
        setMenu(false)
        onGoToMyBooks()
    }

    function handleGoToQuick(event) {
        event.preventDefault()
        setMenu(false)
        onGoToQuick()
    }

    function handleGoToSearch(event) {
        event.preventDefault()
        setMenu(false)
        onGoToSearch()
    }

    function handleGoToFriends(event) {
        event.preventDefault()
        setMenu(false)
        onGoToFriends()
    }

    function handleGoToRequests(event) {
        event.preventDefault()
        setMenu(false)
        onGoToRequests()
    }

    function handleMenu(event){
        event.preventDefault()
        menu ? setMenu(false): setMenu(true)
    }

    return <>
        <header className="header">
            <nav className="header_nav">
                <ul className="header_ul">
                    <li><a href=""><img src={logo} className="header_icon" alt="" /></a></li>
                    <li><FontAwesomeIcon className="header_icon" icon={faBars} size="2x" color="#ff1414" onClick={handleMenu} /></li>
                </ul>
                <ul className={menu ?"header_hidden" : "header_hidden hidden" }>
                    <p className="header_name">Hello, {name}!</p>
                    <a href="" className="header_options" onClick={handleGoToSearch}>Search Bookings</a>
                    <a href="" className="header_options" onClick={handleGoToQuick}>Quick Booking</a>
                    <a href="" className="header_options" onClick={handleGoToMyBooks}>My Bookings</a>
                    <a href="" className="header_options" onClick={handleGoToFriends}>Friends List</a>
                    <a href="" className="header_options" onClick={handleGoToRequests}>Friendship Requests</a>
                    <a href="" className="header_options" onClick={handleGoToUpdate}>Edit Profile</a>
                    <a href="" className="header_options_logout" onClick={handleLogout}>Logout</a>
                </ul>
            </nav>
        </header>
    </>
})