require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { NotAllowedError } = require('../../tennis-errors')
const { mongoose, models: { User } } = require('tennis-data')
const { expect } = require('chai')
const { random } = Math
const updateUser = require('./update-user')
const bcrypt = require('bcryptjs')

describe('updateUser', () => {
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
        let _id, _id2

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, memberNumber, email, password })
                )
                .then(user => {
                    _id = user.id
                    return User.create({ name, surname, memberNumber: memberNumber2, email: email2, password })
                })
                .then(user2 =>{
                    _id2 = user2.id
                })
        )

        it('should succeed on correct and valid and right credentials', () =>
            updateUser(_id, { email: email_, oldPassword: password, password: newPassword})
                .then(() => {
                    return User.findById(_id)
                })
                .then (user => {
                    expect(user.email).to.equal(email_)
                    return bcrypt.compare(newPassword, user.password)
                })
                .then(validPassword => expect(validPassword).to.be.true)
        )

        it('should succeed on correct and valid and right credentials', () =>
            updateUser(_id, { email: email_})
            .then(() => {
                return User.findById(_id)
            })
            .then (user => {
                expect(user.email).to.equal(email_)
            })
        )


        it('should fail when email is already in use', () => {
            let oldPassword
            updateUser(_id, { email: email2})
            .then(() => { throw new NotAllowedError('should not reach this point') })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal('This email is already in use')
            })
        })

        it('should fail when email is already in use', () => {
            let wrongPassword = '123'
            updateUser(_id, { email: email_, oldPassword: wrongPassword, password: newPassword})
            .then(() => { throw new NotAllowedError('should not reach this point') })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal('Old password incorrect')
            })
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})