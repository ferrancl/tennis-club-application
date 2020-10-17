require('dotenv').config()

const { expect } = require('chai')
const { NotAllowedError } = require('tennis-errors')
const { random } = Math
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const cancelBook = require('./cancel-book')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('cancel book', () => {
    let name, surname, email, password, memberNumber
    let name2, surname2, email2, password2, memberNumber2
    let _id, _id2, _id3, _idCourt, _idBook

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber - ${Math.floor(random())}`

        name2 = `name-${random()}`
        surname2 = `surname-${random()}`
        email2 = `email-${random()}@mail.com`
        password2 = `password-${random()}`
        memberNumber2 = `memberNumber2-${Math.floor(random())}`
        memberNumber3 = `memberNumber3-${Math.floor(random())}`
        email3 = `email-${random()}@mail.com`

        number = `number-${Math.floor(random())}`

    })
    beforeEach(() =>
        User.create({ name, surname, memberNumber, email, password })
            .then(({ id }) => _id = id)
    )
    beforeEach(() =>
        User.create({ name: name2, surname: surname2, memberNumber: memberNumber2, email: email2, password: password2 })
            .then(({ id }) => _id2 = id)
    )
    beforeEach(() =>
        User.create({ name: name2, surname: surname2, memberNumber: memberNumber3, email: email3, password: password2 })
            .then(({ id }) => _id3 = id)
    )
    beforeEach(() =>
        Court.create({number, surface: "clay"})
        .then(court => {
            _idCourt = court})
    )
    beforeEach(() =>
        Booking.create({users: [_id, _id2], date: new Date(Date.now()), day: '3/23/2020', status:'PRE', court: _idCourt })
        .then(({ id }) => {
            _idBook = id
            return User.findById(_id)})
        .then(user => {
            user.bookings = _idBook
            user.save()
            return User.findById(_id2)})
        .then(user2 => {
            user2.bookings = _idBook
            user2.save()
        })
    )

    it('should succeed on correct user data', () =>
    cancelBook(_id, _idBook)
    .then((result)=> {
        expect(result).not.to.exist
        expect(result).to.be.undefined
        
        return Booking.findById(_idBook)
    })
    .then(book => {
        expect(book).not.to.exist
    })
    )
    
    it('should fail when the user has not booked the court', () =>{
        cancelBook(_id3, _idBook)
        .then(() => { throw new NotAllowedError('should not reach this point') })
        .catch(({ message }) => {
            expect(message).not.to.be.undefined
            expect(message).to.equal('This user cannot cancel this book')
        })

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})