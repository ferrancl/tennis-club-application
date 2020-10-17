const { answerRequest } = require('../../logic')
const {  NotFoundError } = require('tennis-errors')

module.exports = (req, res) => {
    const { payload: { sub: id }, body: {user2, answer} } = req

    try {
        answerRequest(id, user2, answer)
            .then(() => res.status(201).end())
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