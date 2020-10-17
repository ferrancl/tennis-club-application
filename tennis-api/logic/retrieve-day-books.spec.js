require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const retrieveDayBooks = require('./retrieve-day-books')

const { env: { TEST_MONGODB_URL } } = process

describe('book', () => {
    let name, surname, email, email2, password, memberNumber, memberNumber2, number, tomorrow, tomorrowDay, today, todayDay
    
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        var dd = tomorrow.getDate()
        var mm = tomorrow.getMonth()+1;
        var yyyy = tomorrow.getFullYear();
        tomorrowDay = mm+'/'+dd+'/'+yyyy;

        today = new Date()
        today.setDate(new Date().getDate())
        var dd = today.getDate()
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        todayDay = mm+'/'+dd+'/'+yyyy;

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        email2 = `email2-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber-${Math.floor(random())}`
        memberNumber2 = `memberNumber2-${Math.floor(random())}`
        number = `number-${Math.floor(random())}`
    })
    describe('when user already exists', () => {
        
        let _id1, _id2, user3, user4, __id
        
        beforeEach(() =>
            User.insertMany([
                { name, surname, memberNumber, email, password },
                { name, surname, memberNumber: memberNumber2, email: email2, password }
            ])
            .then(([{ id }, { id: other }]) => {
                _id1 = id
                _id2 = other
                return Court.create({number, surface: "clay"})
            })
            .then(court => {
                __id = court
            })
            
            )

            beforeEach(() =>
            Booking.create({users: [_id1, _id2], date: tomorrow, day: tomorrowDay, status:'PRE', court: __id })
            .then(({ id }) => {
                _idBookTomorrow = id
                return User.findById(_id1)})
            .then(user => {
                user.bookings = _idBookTomorrow
                user.save()
                return User.findById(_id2)})
            .then(user2 => {
                user2.bookings = _idBookTomorrow
                user2.save()
            })
            )

            beforeEach(() =>
            Booking.create({users: [_id1, _id2], date: today, day: todayDay, status:'PRE', court: __id })
            .then(({ id }) => {
                _idBookToday = id
                return User.findById(_id1)})
            .then(user => {
                user.bookings = _idBookToday
                user.save()
                return User.findById(_id2)})
            .then(user2 => {
                user2.bookings = _idBookToday
                user2.save()
            })
            )

        it('should succeed on correct user data', () =>
            retrieveDayBooks(tomorrowDay)
            .then(books => {
                books.forEach(book =>{
                    expect(book).to.exist
                    expect(book.id).to.be.a('string')
                    expect(book.users[0].toString()).to.equal(_id1)
                    expect(book.users[1].toString()).to.equal(_id2)
                    expect(book.court.number).to.equal(number)
                    expect(book.date).to.be.instanceOf(Date)
                    expect(book.day).to.equal(tomorrowDay)
                })
                return retrieveDayBooks(todayDay)
            })
            .then(books => {
                books.forEach(book =>{
                    expect(book).to.exist
                    expect(book.id).to.be.a('string')
                    expect(book.users[0].toString()).to.equal(_id1)
                    expect(book.users[1].toString()).to.equal(_id2)
                    expect(book.court.number).to.equal(number)
                    expect(book.date).to.be.instanceOf(Date)
                    expect(book.day).to.equal(todayDay)
                })
            })
        )
    
        after(() => Booking.deleteMany().then(() => mongoose.disconnect()))
    })
})