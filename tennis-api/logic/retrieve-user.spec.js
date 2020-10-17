require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { NotFoundError } = require('../../tennis-errors')
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('tennis-data')

describe('retrieveUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, memberNumber, users

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
            User.create({ name, surname, memberNumber, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.memberNumber).to.equal(memberNumber)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )

    })    


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})