import React, { useEffect, useContext, useState } from 'react'
import './style/App.sass'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Remember from './Remember'
import Update from './Update'
import Quick from './Quick'
import MyBooks from './MyBooks'
import Search from './Search'
import Requests from './Requests'
import Friends from './Friends'
import { registerUser, login, logout, isLoggedIn, rememberPassword, updateUser, cancelBook, retrieveDayBooks, book, retrieveWeather, quickSearch, retrieveUser, answerRequest, retrieveUserFriends, friendRequest } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Header from './Header'
import HeaderWL from './HeaderWL'
const moment = require('moment')


export default withRouter(function ({ history }) {
  const [state, setState] = useContext(Context)
  const [bookedCourts, setBookedCourts] = useState([])
  const [weather, setWeather] = useState()
  const [quickBook, setQuickBook] = useState(['',''])


  useEffect(() => {
      setState({ page: 'home' })

      history.push('/home')
  }, [])

  function __handleError__(error) {
      
      setState({...state, error: error.message })

      setTimeout(() => {
        setState({ error: undefined })
      }, 3000)
  }

  async function handleRegister(name, surname, email, password, confirmPassword) {
    try {
      await registerUser(name, surname, email, password, confirmPassword)

      history.push('/login')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleLogin(email, password) {
    try {
      await login(email, password)

      history.push('/search')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleRemember(email) {
    try {
      await rememberPassword(email)

      history.push('/login')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleUpdateUser(email, oldPassword, password, confirmPassword) {
    try {
      await updateUser(email, oldPassword, password, confirmPassword)

      logout()
      history.push('/login')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleCancelBook(id) {
    try {
      await cancelBook(id)

      history.push('/search')
    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleQuick(hour){
    try {
      const quickBook = await quickSearch(hour)
      setQuickBook(quickBook)

    } catch (error) {
      return __handleError__(error)
    }
  }


  async function handleBook(user2, user3, user4, number, date){
    try {
      let message = await book(user2, user3, user4, number, date)
      setState({message})
      setTimeout(() => {
        setState({ message: undefined })
      }, 3000)

      let day = moment(date).format("M/D/YYYY")

      return handleDayBooks(day)

    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleWeather(date){
    try {
      const weather= await retrieveWeather(date)
      setWeather(weather)

    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleDayBooks(day) {
    try {
      let array=[]
      const results = await retrieveDayBooks(day)

      results.map(result => array.push(`${result.court.number}-${(new Date(result.date).getHours())}`))
      setBookedCourts(array)


    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleFriendRequest(user2,  name2, surname2) {
    try {
      await friendRequest(user2, name2, surname2)

      history.push('/friends-requests')


    } catch (error) {
      return __handleError__(error)
    }
  }

  async function handleAnswerRequest(user2, answer) {
    try {
      await answerRequest(user2, answer)

      history.push('/friends-list')

    } catch (error) {
      return __handleError__(error)
    }
  }


  function handleGoToLogin() {
    history.push('/login')
  }

  function handleGoToRegister() {
    history.push('/register')
  }

  function handleGoToRememberPassword() {
    history.push('/remember-password')
  }
  function handleGoToSearch(){
    history.push('./search')
  }

  function handleGoToQuick(){
    history.push('./quick-search')
  }

  function handleGoToUpdate(){
    history.push('./update-user')
  }

  function handleGoToMyBooks(){
    history.push('/my-books')
  }

  function handleGoToRequests(){
    history.push('/friends-requests')
  }

  function handleGoToFriends(){
    history.push('/friends-list')
  }

  const { error, message } = state

  return <div className="app">
      <Route exact path="/" render={() => isLoggedIn() ? <Redirect to="/search" /> : <Redirect to="/login" />} />
      <Route path="/" render={() => isLoggedIn() ?<Header onGoToMyBooks={handleGoToMyBooks} onGoToSearch={handleGoToSearch} onGoToQuick={handleGoToQuick} onGoToUpdate={handleGoToUpdate} onGoToRequests={handleGoToRequests} onGoToFriends={handleGoToFriends}/>: <HeaderWL onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister}/>} />
      <Route path="/register" render={() => isLoggedIn() ? <Redirect to="/search" /> : <Register onSubmit={handleRegister} error={error} />} />
      <Route path="/login" render={() => isLoggedIn() ? <Redirect to="/search" /> : <Login onSubmit={handleLogin} onGoToRememberPassword={handleGoToRememberPassword} error={error} />} />
      <Route path="/home" render={() => <Home/> }/>
      <Route path="/remember-password" render={() => isLoggedIn() ? <Redirect to="/search" /> : <Remember onSubmit={handleRemember} error={error} />} />
      <Route path="/update-user" render={() => isLoggedIn() ? <Update onSubmit={handleUpdateUser} error={error} />: <Redirect to="/login" />} />
      <Route path="/my-books" render={() => isLoggedIn() ? <MyBooks onSubmit={handleCancelBook} error={error} />: <Redirect to="/login" />} />
      <Route path="/search" render={() => isLoggedIn() ? <Search onSubmit={handleDayBooks} onSubmitWeather={handleWeather} error={error} bookedCourts={bookedCourts} handleBook={handleBook} weather={weather} message={message}/>: <Redirect to="/login" />} />
      <Route path="/quick-search" render={() => isLoggedIn() ? <Quick onSubmit={handleBook} onChange={handleQuick} quickBook={quickBook} error={error} message={message}/>: <Redirect to="/login" />} />
      <Route path="/friends-requests" render={() => isLoggedIn() ? <Requests onAnswer={handleAnswerRequest} error={error}/>: <Redirect to="/login" />} />
      <Route path="/friends-list" render={() => isLoggedIn() ? <Friends onSubmit={handleFriendRequest} error={error}/>: <Redirect to="/login" />} />
  </div>
})