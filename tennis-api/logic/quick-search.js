const { validate } = require('../../tennis-utils')
const { models: { Booking, Court } } = require('../../tennis-data')
const { NotAllowedError } = require('../../tennis-errors')


/**
 * Searchs for the first court available 
 * 
 * @param {string} userId user's id that wants to cancel the booking
 * @param {string} hour hour that the user wants to start the quick search
 * 
 * @returns {Promise}
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

module.exports = (userId, hour) => {
    validate.string(userId, 'userId')
    validate.string(hour, 'hour')
    hour = parseInt(hour)
    let date = new Date(Date.now())
    if (hour < date.getHours()) throw new NotAllowedError("Invalid hour")
    let dateWithoutMinutes = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour )

    date.setHours(22) 

    return Court.find({})
        .then(courts=> {
            courts.sort(() => Math.random() - 0.5)
            async function quickBook(){
                while (dateWithoutMinutes<date){
                    for (let court of courts) {
                        let result = await Booking.find({court, date: dateWithoutMinutes})
                        if (result.length === 0){
                            return [court.number, dateWithoutMinutes]
                        } 
                    }
                    dateWithoutMinutes.setHours(dateWithoutMinutes.getHours()+1)
                }
                throw new Error("No bookings availables for today")
            }
            return quickBook()
        })
        .then(book => {
            book[1] = book[1].getMonth() + 1 +  "/" + (book[1].getDate())+"/" + (book[1].getFullYear())+ " " + (book[1].getHours())+":00"
            return book
        })
}