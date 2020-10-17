import context from './context'
const { random } = Math
const { book } = require('.')
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const jwt = require('jsonwebtoken')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('book', () => {
    beforeAll(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => User.deleteMany())
    )   

    let name, surname, email, email2, password, memberNumber, memberNumber2, number, tomorrow, tomorrowDay

    beforeEach(() => {
        tomorrow = new Date()
        tomorrow.setDate(new Date().getDate()+1)
        var dd = tomorrow.getDate()
        var mm = tomorrow.getMonth()+1;
        var yyyy = tomorrow.getFullYear();
        tomorrowDay = mm+'/'+dd+'/'+yyyy;

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

        let _id1, _id2, __id, user3, user4

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
        })
        
        )

        it('should succeed on correct and valid and right credentials', () =>
            book(memberNumber2, user3, user4, number, tomorrow.toString())
                .then(result => {
                    expect(result).toBeUndefined()
                    return Booking.find({users: _id1})
                })
                .then(book =>{
                    expect(book).toBeDefined()
                    expect(book[0].users[0].toString()).toBe(_id1)
                    expect(book[0].users[1].toString()).toBe(_id2)
                    expect(book[0].day).toBe(tomorrowDay)
                    expect(book[0].court.number).toBe(number)
                    expect(book[0].court.number).toBe(number)
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