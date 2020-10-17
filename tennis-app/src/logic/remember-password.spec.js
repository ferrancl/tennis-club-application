import context from './context'
const { random } = Math
const { rememberPassword } = require('.')
const bcrypt = require('bcryptjs')
const { mongoose, models: { User } } = require('tennis-data')
const jwt = require('jsonwebtoken')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('remember password', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, memberNumber, _id

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber - ${Math.floor(random())}`
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            bcrypt.hash(password, 10)
            .then(encryptedPassword =>{
                return User.create({ name, surname, memberNumber, email, password: encryptedPassword })
            })
            .then(({ id }) => {
                context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
                _id = id
            })
        )

        it('should succeed on correct and valid and right data', () =>
            rememberPassword(email)
                .then(() => {
                    return User.findById(_id)
                })
                .then(user  =>{
                    return bcrypt.compare(password, user.password)

                })
                .then(comparison =>{
                    expect(comparison).toBe(false) 
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