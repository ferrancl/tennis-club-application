import React, { useState, useEffect, useContext } from 'react'
import './style/Header.sass'
import './style/Form.sass'
import { retrieveUserBooks, isLoggedIn} from '../logic'
import { Context } from './ContextProvider'
import { withRouter } from 'react-router-dom'


export default withRouter(function ({onSubmit, error, onMount, history }) {
    const [, setState] = useContext(Context)
    const [myBooks, setMyBooks] = useState([])

    useEffect(() => {
        if (isLoggedIn())
            (async () => {
                try {
                    const myBooks = await retrieveUserBooks()

                    setMyBooks(myBooks)
                    
                } catch ({ message }) {
                    setState({ error: message, page: 'login' })
                }
            })()
        else setState({ page: 'login' })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            book: { value: book },
        } } = event

        onSubmit(book)
    }

    return <>
        <div className="form">
                <h3 className="form_title">MY BOOKINGS</h3>
        </div>
        <div className="bookings">
            {myBooks.length>0? myBooks.map(book => <form className="bookings_book" onSubmit={handleSubmit}><p className="mybooks">Date: {book.day}</p><p>Hour: {new Date(book.date).getHours()}h</p><p>Court: {book.court.number}</p><input type="hidden" name = "book" id="book" value={book.id}/><button className="form_button" type="submit">CANCEL</button></form>): <p className="form_nobookings">No bookings pending :(</p>}
        </div>
    </>
})