require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const { NotAllowedError } = require('tennis-errors')
const quickSearch = require('./quick-search')

const { env: { TEST_MONGODB_URL } } = process

describe('quick search', () => {
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
        
        let _id1, _other, user3, user4, court_, court2_, _id2, _id3, _id4
        
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
                court_ = court
                return Court.create({number: number2, surface: "clay"})
            })
            .then(court2 => {
                court2_ = court2
            })

        )

        it('should return the first court available', () =>  {  
            let now = new Date(Date.now())
            let date2=  new Date(Date.now())
            let hour = date2.getHours().toString()
            date2.setHours(date2.getHours()+1)
            Booking.insertMany([
                { users: [_id1, _id2], date: now, day: '3/23/2020', status:'PRE', court: court_ } ,
                { users: [_id1, _id2], date: date2, day: '3/23/2020', status:'PRE', court: court2_ }
            ])
            .then(() => quickSearch(_id3, hour))
            .then((book) => {
                expect(book).to.exist
                expect(book[0]).to.be(court2_.number)
                expect(book[1]).to.be(now.getMonth() + 1 +  "/" + (now.getDate())+"/" + (now.getFullYear())+ " " + (now.getHours())+":00")
            })
        })

        it('should return the first court available', () =>  {  
            let now = new Date(Date.now())
            let date2=  new Date(Date.now())
            let hour = date2.getHours().toString()
            date2.setHours(date2.getHours()+1)
            Booking.insertMany([
                { users: [_id1, _id2], date: now, day: '3/23/2020', status:'PRE', court: court_ } ,
                { users: [_id3, _id4], date: now, day: '3/23/2020', status:'PRE', court: court2_ },
                { users: [_id1, _id2], date: date2, day: '3/23/2020', status:'PRE', court: court_ } ,
                { users: [_id3, _id4], date: date2, day: '3/23/2020', status:'PRE', court: court2_ }
            ])
            .then(() => quickSearch(_id3, hour))
            .then((book) => {
                expect(book).to.exist
                expect(book[0]).to.be(court_.number)
                expect(book[1]).to.be(now.getMonth() + 1 +  "/" + (now.getDate())+"/" + (now.getFullYear())+ " " + (now.getHours() + 2)+":00")
            })
        })


        it('should return a message that there is no court available', () =>  {  
            let date2=  new Date(Date.now())
            date2.setHours(22)
            let hour = date2.getHours().toString()
            Booking.insertMany([
                { users: [_id1, _id2], date: date2, day: '3/23/2020', status:'PRE', court: court_ } ,
                { users: [_id1, _id2], date: date2, day: '3/23/2020', status:'PRE', court: court2_ }
            ])
            .then(() => quickSearch(_id3, hour))
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal('No bookings availables for today')
            })
        })
        

        it('should fail when a user wants to search books in hours in the past', () =>  {   
            let now = new Date(Date.now())
            let hour = (now.getHours()-2).toString()   
            expect(() => quickSearch(_id1, hour)).to.throw(NotAllowedError, 'Wrong data')
        })
    
    })
    after(() => Promise.all([User.deleteMany(), Booking.deleteMany(),Court.deleteMany()]).then(() => mongoose.disconnect()))
})
