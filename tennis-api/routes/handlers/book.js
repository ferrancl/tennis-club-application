const { book } = require('../../logic')
const { ContentError } = require('tennis-errors')

module.exports = (req, res) => {
    const { payload: { sub: idUser1 }, body: { user2, user3, user4, number, date } } = req

    try {
        book(idUser1, user2, user3, user4, number, date)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}