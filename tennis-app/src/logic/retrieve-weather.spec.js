const { retrieveWeather } = require('.')

describe('retrieve day books', () => {
        
    it('should succeed on correct and valid data', () => {
        let date = new Date(Date.now())
        date.setDate(date.getDate()+1)
        date.setHours(12)
        let day = date.getDate()
        let month = date.getMonth()
        if (day.length === 1) day = "0"+day
        if (month.lenght === 1) month = "0"+month
        date= month+"/"+day+"/"+date.getFullYear() + " " + date.getHours()+":00"

        retrieveWeather(date)
        .then(weather => {
            expect(weather).toBeDefined()
        })
    })

})