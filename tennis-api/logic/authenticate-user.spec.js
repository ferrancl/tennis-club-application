require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('tennis-data')
const { NotAllowedError } = require('tennis-errors')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, memberNumber

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber - ${Math.floor(random())}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, memberNumber, email, password })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid and right credentials with memberNumber', () =>
            authenticateUser(memberNumber, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
                )
            it('should succeed on correct and valid and right credentials with email', () =>
                authenticateUser(email, password)
                    .then(id => {
                        expect(id).to.be.a('string')
                        expect(id.length).to.be.greaterThan(0)
                        expect(id).to.equal(_id)
                        return
                    })
            )
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, memberNumber, email, password })
                )
                .then(user => _id = user.id)
        )
        it('should fail on non existing user', () => {
            let wrongEmail= "not-exist@mail.com"
            authenticateUser(wrongEmail, password)
            .then(() => { throw new NotAllowedError('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal('wrong credentials')
                })
        })
        it('should fail on non wrong credentials', () => {
            let wrongPassword= "wrongPassword"
            authenticateUser(email, wrongPassword)
            .then(() => { throw new NotAllowedError('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal('wrong credentials')
                })
        })

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})