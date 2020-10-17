require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('tennis-data')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')
const { NotAllowedError } = require('tennis-errors')


const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let name, surname, email, password, memberNumber, email2

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        email2 = `email2-${random()}@mail.com`
        memberNumber = `memberNumber-${random()}`
        password = `password-${random()}`

    })

    it('should succeed on correct user data', () =>
        registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.created).to.be.instanceOf(Date)

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
    )
    it('should fail  when user already exists', () =>{
        let email2 = `email-${random()}@mail.com`
        User.create({ name, surname, memberNumber, email: email2, password })
        .then(()=> {
            return registerUser(name, surname, email2, password)
        })
        .catch(({ message }) => {
            expect(message).not.to.be.undefined
            expect(message).to.equal(`User with email ${email2} already exists`)
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})