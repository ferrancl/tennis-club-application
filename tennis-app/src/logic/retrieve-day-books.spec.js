import context from './context'
const { random } = Math
const { retrieveDayBooks } = require('.')
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const jwt = require('jsonwebtoken')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('retrieve day books', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, email2, password, memberNumber, memberNumber2, number, tomorrow, tomorrowDay, today, todayDay

    beforeEach(() => {
        tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        tomorrow.setHours(new Date().getHours()+1)
        var dd = tomorrow.getDate()
        var mm = tomorrow.getMonth()+1;
        var yyyy = tomorrow.getFullYear();
        tomorrowDay = mm+'/'+dd+'/'+yyyy;

        today = new Date()
        today.setHours(new Date().getHours()+1)
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
        
        let _id1, _id2, __id, _idBookTomorrow, _idBookToday

        beforeEach(() =>
            User.insertMany([
                { name, surname, memberNumber, email, password },
                { name, surname, memberNumber: memberNumber2, email: email2, password }
            ])
            .then(([{ id }, { id: other }]) => {
                _id1 = id
                context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
                _id2 = other
                return Court.create({number, surface: "clay"})
            })
            .then(court => {
                __id = court
                return Booking.insertMany([
                    {users: [_id1, _id2], date: tomorrow, day: tomorrowDay, status:'PRE', court: __id },
                    {users: [_id1, _id2], date: today, day: todayDay, status:'PRE', court: __id }
                ])
            })     
            .then(([{ id }, { id: other }]) => {
                _idBookTomorrow = id
                _idBookToday = other
                return User.findById(_id1)})
            .then(user => {
                user.bookings.push(_idBookTomorrow, _idBookToday)
                user.save()
                return User.findById(_id2)})
            .then(user2 => {
                user2.bookings.push(_idBookTomorrow, _idBookToday)
                user2.save()
            })
            )
        it('should succeed on correct and valid and right data', () =>
            retrieveDayBooks(tomorrowDay)
                .then(books => {
                    books.forEach(book =>{
                        expect(book).toBeDefined()
                        expect(typeof book.id).toBe('string')
                        expect(book.users).toContain(_id1)
                        expect(book.users).toContain(_id2)
                        expect(book.court.number).toBe(number)
                        expect(book.day).toBe(tomorrowDay)
                    })
                    return retrieveDayBooks(todayDay)
                })
                .then(books => {
                    books.forEach(book =>{
                        expect(book).toBeDefined()
                        expect(typeof book.id).toBe('string')
                        expect(book.users).toContain(_id1)
                        expect(book.users).toContain(_id2)
                        expect(book.court.number).toBe(number)
                        expect(book.day).toBe(todayDay)
                    })
                })
        )
    })
    afterAll(() => Booking.deleteMany()
                .then(() => {
                    User.deleteMany()
                })
                .then(() => {
                    mongoose.disconnect()
                }))

})