const { retrieveUserBooks } = require('../../logic')
const {  NotFoundError } = require('tennis-errors')

module.exports = (req, res) => {
    const { params: {id} } = req

    try {
        retrieveUserBooks(id)
            .then(book =>
                res.status(200).json(book)
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404
                break
        }

        const {message} = error

        res
            .status(status)
            .json({ 
                error: message
            })
    }
}