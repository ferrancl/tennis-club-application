require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const { NotAllowedError } = require('tennis-errors')
const book = require('./book')

const { env: { TEST_MONGODB_URL } } = process

describe('book', () => {
    let name, surname, email, email2, email3, email4, password, memberNumber, memberNumber2, memberNumber3, memberNumber4, memberNumber5, number, number2
    
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        email2 = `email2-${random()}@mail.com`
        email3 = `email3-${random()}@mail.com`
        email4 = `email4-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber-${Math.floor(random())}`
        memberNumber2 = `memberNumber2-${Math.floor(random())*5}`
        memberNumber3 = `memberNumber3-${Math.floor(random())*10}`
        memberNumber4 = `memberNumber4-${Math.floor(random())*10}`
        memberNumber5 = `memberNumber5-${Math.floor(random())*10}`
        number = `number-${Math.floor(random())}`
        number2 = `number-${Math.floor(random())}`

    })
    describe('when user already exists', () => {
        
        let _id1, _other, user3, user4, __id, __id2, _id2, _id3, _id4
        
        beforeEach(() =>
            User.insertMany([
                { name, surname, memberNumber, email, password },
                { name, surname, memberNumber: memberNumber2, email: email2, password },
                { name, surname, memberNumber: memberNumber3, email: email3, password },
                { name, surname, memberNumber: memberNumber4, email: email4, password }

            ])
            .then(([{ id }, { id: id2 }, { id: id3 },  { id: id4 }]) => {
                _id1 = id
                _id2 = id2
                _id3 = id3
                _id4 = id4
                return Court.create({number, surface: "clay"})
            })
            .then(court => {
                __id = court.id
                return Court.create({number: number2, surface: "clay"})
            })
            .then(court2 => {
                __id2 = court2.id
            })

            )

        it('should succeed on correct user data', () => {
            let tomorrow = new Date(Date.now())
            tomorrow.setDate(tomorrow.getDate()+1)    
            book(_id1, memberNumber2, memberNumber3, memberNumber4, number, tomorrow)
            .then(() => {
                return Booking.findOne({ date: tomorrow })
            })
            .then(book => {
                expect(book).to.exist
                expect(book.id).to.be.a('string')
                expect(book.users[0].toString()).to.equal(_id1)
                expect(book.users[1].toString()).to.equal(_id2)
                expect(book.users[2].toString()).to.equal(_id3)
                expect(book.users[3].toString()).to.equal(_id4)
                expect(book.court.number).to.equal(number)
                expect(book.date).to.be.instanceOf(Date)
            })
        })    
        
        it('should succeed on correct user data', () =>  {   
            let now = new Date(Date.now())    
            book(_id1, memberNumber2, user3, user4, number, now)
            .then(() => {
                return Booking.findOne({ date: now })
            })
            .then(book => {
                expect(book).to.exist
                expect(book.id).to.be.a('string')
                expect(book.users[0].toString()).to.equal(_id1)
                expect(book.users[1].toString()).to.equal(_other)
                expect(book.court.number).to.equal(number)
                expect(book.date).to.be.instanceOf(Date)
            })
        })

        it('should fail on wrong hour', () => {
            let date = new Date(Date.now())
            date.setDate(date.getDate()-2)
            expect(() => book(_id1, memberNumber2, user3, user4, number, date)).to.throw(NotAllowedError, 'Invalid hour')
        })

        it('should fail when member user 3 is provided and member number 4 is empty', () => {
            expect(() => book(_id1, memberNumber2, memberNumber3, user4, number, new Date(Date.now()))).to.throw(NotAllowedError, 'Please enter the user member number of the 4th player')
        })

        it('should fail when member user 4 is provided and member number 3 is empty', () => {
            expect(() => book(_id1, memberNumber2, user3, memberNumber3, number, new Date(Date.now()))).to.throw(NotAllowedError, 'Please enter the user member number of the 3rd player')
        })

        it('should fail when the member number not exists', () =>{
            let tomorrow = new Date(Date.now())
            tomorrow.setDate(tomorrow.getDate()+2)    
            book(_id1, memberNumber5, user3, user4, number, tomorrow)
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`User with member number ${memberNumber5} not found`)
            })
        })

        it('should fail when the member number not exists', () =>{
            let tomorrow = new Date(Date.now())
            tomorrow.setDate(tomorrow.getDate()+2)    
            book(_id1, memberNumber2, memberNumber5, memberNumber4, number, tomorrow)
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`User with member number ${memberNumber5} not found`)
            })
        })

        it('should fail when the member number not exists', () =>{
            let tomorrow = new Date(Date.now())
            tomorrow.setDate(tomorrow.getDate()+2)    
            book(_id1, memberNumber2, memberNumber3, memberNumber5, number, tomorrow)
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`User with member number ${memberNumber5} not found`)
            })
        })

        it('should fail  when court is already booked at the same time', () =>  {   
            let now = new Date(Date.now())    
            book(_id1, memberNumber2, user3, user4, number, now)
            .then(() => {
                return book(_id3, memberNumber4, user3, user4, number, now)
            })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`Court ${number} already booked at this time`)
            })
        })

        it('should fail when a user wants to book two different courts at the same hour', () =>  {   
            let now = new Date(Date.now())    
            book(_id1, memberNumber2, user3, user4, number, now)
            .then(() => {
                return book(_id1, memberNumber3, user3, user4, number, now)
            })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`User with member number ${memberNumber} has already booked a court at the same time`)
            })
        })

        it('should fail when a user wants to book two different courts at the same hour', () =>  {   
            let now = new Date(Date.now())    
            book(_id1, memberNumber3, user3, user4, number, now)
            .then(() => {
                return book(_id2, memberNumber3, user3, user4, number, now)
            })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`User with member number ${memberNumber3} has already booked a court at the same time`)
            })
        })


    })
    after(() => Promise.all([User.deleteMany(), Booking.deleteMany(),Court.deleteMany()]).then(() => mongoose.disconnect()))
})