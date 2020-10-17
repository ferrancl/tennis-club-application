import React, { useState, useEffect, useContext } from 'react'
import './style/Info.sass'
import './style/Footer.sass'
import hard from '../utils/hard-court.jpeg'
import tennis from '../utils/tennis.jpg'
import activities from '../utils/activities.jpg'
import gym from '../utils/gym.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default (function ({ }) {

    return <>
        <section className="info">
        <h3 className="info_title">WELCOME TO BREAK POINT CLUB</h3>
        <h6 className="info_subtitle">More than 20.000 m² for practicing sport </h6>
        <p className="info_description">Located in a fantastic place of Barcelona, Break Point is the perfect tennis club for you and your family and friends to practice this sport.

            The club has more facilities to enjoy and to have a good experience: gym, activities and a pub where to share your time with other members.  </p>
        <img  className="info_image" src={tennis} alt=""/>

        <h6 className="info_subtitle">10 courts: 5 clay and 5 hardcourt</h6>
        <p className="info_description">In our club we have to kind of courts: clay and hard. It provides the perfect area for our members to improve their tennis and to become the perfect player! A good player has to fit and feel comfortable in all conditions.</p>
        <div className="info_activities">
            <img src={hard} className="info_activities_image" alt=""/>
            <p className="info_text">TENNIS</p>
        </div>
        <h6 className="info_subtitle">Book your court in our membership area</h6>
        <p className="info_description">You can book your favourite court until 2 days before you play, choosing between all the courts availables.</p>

        <div className="info_activities">
            <img src={gym} className="info_activities_image" alt=""/>
            <p className="info_text">GYM</p>
        </div>
        <h6 className="info_subtitle">Train for your best game</h6>
        <p className="info_description">You can enjoy our gym facilities before and after your tennis match.</p>

        <div className="info_activities">
            <img src={activities} className="info_activities_image" alt=""/>
            <p className="info_text">ACTIVITIES</p>
        </div>
        <h6 className="info_subtitle">Partipate in our clubs life</h6>
        <p className="info_description">We organize a lot of indoor and outdoor activities for our members. Please get more information in our offices or contact with us.</p>

    </section>
    <footer className="footer">
        <p className="footer_text"><FontAwesomeIcon className="header_icon" icon={faLocationArrow} size="1x" color="#ff1414" />Street 11 Nº 22, 3333 Barcelona</p>
        <p className="footer_text"><FontAwesomeIcon className="header_icon" icon={faPhone} size="1x" color="#ff1414" />   111 222 3333</p>
        <p className="footer_text"><FontAwesomeIcon className="header_icon" icon={faEnvelope} size="1x" color="#ff1414" />   break.point.club@gmail.com</p>
    </footer>
    </>
})