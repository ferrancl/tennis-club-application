import context from './context'
const { random } = Math
const { quickSearch } = require('.')
const { mongoose, models: { User, Booking, Court } } = require('tennis-data')
const jwt = require('jsonwebtoken')

const { env: {
    REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL,
    REACT_APP_TEST_JWT_SECRET: TEST_JWT_SECRET
} } = process

describe('quick search', () => {
    let name, surname, email, email2, password, memberNumber, memberNumber2, number, number2
    
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        email2 = `email2-${random()}@mail.com`
        password = `password-${random()}`
        memberNumber = `memberNumber-${Math.floor(random())}`
        memberNumber2 = `memberNumber2-${Math.floor(random())*5}`
        number = `number-${Math.floor(random())}`
        number2 = `number-${Math.floor(random())}`

    })
    describe('when user already exists', () => {
        
        let _id1, court_, court2_, _id2
        
        beforeEach(() =>
            User.insertMany([
                { name, surname, memberNumber, email, password },
                { name, surname, memberNumber: memberNumber2, email: email2, password }
            ])
            .then(([{ id }, { id: id2 }]) => {
                context.token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
                _id1 = id
                _id2 = id2
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
            .then(() => quickSearch(hour))
            .then((book) => {
                expect(book).to.exist
                expect(book[0]).toBe(court2_.number)
                expect(book[1]).toBe(now.getMonth() + 1 +  "/" + (now.getDate())+"/" + (now.getFullYear())+ " " + (now.getHours())+":00")
            })
        })

    
    })
    afterAll(() => Promise.all([User.deleteMany(), Booking.deleteMany(),Court.deleteMany()]).then(() => mongoose.disconnect()))
})
