import context from './context'
const { random } = Math
const { updateUser } = require('.')
const bcrypt = require('bcryptjs')
const { mongoose, models: { User } } = require('tennis-data')
const jwt = require('jsonwebtoken')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('update user', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, memberNumber, newEmail, newPassword, noEmail, noPassword, _id

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber - ${Math.floor(random())}`
        newEmail = `email-${random()}@mail.com`
        newPassword = `password-${random()}`
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
            updateUser(newEmail, password, newPassword, newPassword)
                .then(user => {
                    expect(user).toBeDefined()
                    return User.findById(_id)
                })
                .then(user  =>{
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(newEmail)
                    return bcrypt.compare(newPassword, user.password)

                })
                .then(comparison =>{
                    expect(comparison).toBe(true) 
                })   
        )

        it('should succeed on correct and valid and right data', () =>
            updateUser(noEmail, password, newPassword, newPassword)
                .then(user => {
                    expect(user).toBeDefined()
                    return User.findById(_id)
                })
                .then(user  =>{
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                    return bcrypt.compare(newPassword, user.password)

                })
                .then(comparison =>{
                    expect(comparison).toBe(true) 
                })   
        )

        it('should succeed on correct and valid and right data', () =>
            updateUser(newEmail, noPassword, noPassword)
                .then(user => {
                    expect(user).toBeDefined()
                    return User.findById(_id)
                })
                .then(user  =>{
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(newEmail)
                    return bcrypt.compare(password, user.password)

                })
                .then(comparison =>{
                    expect(comparison).toBe(true) 
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