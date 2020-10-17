require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { NotFoundError } = require('../../tennis-errors')
const { mongoose, models: { User } } = require('tennis-data')
const { expect } = require('chai')
const { random } = Math
const rememberPassword = require('./remember-password')
const bcrypt = require('bcryptjs')

describe('rememberPassword', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, memberNumber, email_, newPassword, email2, memberNumber2

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        email2 = `email-${random()}@mail.com`
        memberNumber2 = `memberNumber - ${Math.floor(random())}`
        password = `password-${random()}`
        memberNumber = `memberNumber - ${Math.floor(random())}`
        email_ = `email-${random()}@mail.com`
        newPassword = `newPassword-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, memberNumber, email, password })
                )
                .then(user => {
                    _id = user.id
                })
        )

        it('should succeed on correct email address', () =>
            rememberPassword(email)
                .then(() => {
                    return User.findById(_id)
                })
                .then (user => {
                    return bcrypt.compare(password, user.password)
                })
                .then(validPassword => expect(validPassword).to.be.false)
        )

        it('should fail when email is not registered', () => {
            rememberPassword(email2)
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal('Email not registered')
            })
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})