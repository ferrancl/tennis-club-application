const { updateUser } = require('../../logic')
const { NotFoundError } = require('tennis-errors')

module.exports = (req, res) => {
    const { payload: { sub: userId }, body} = req

    try {
        updateUser(userId, body)
            .then(() =>
                res.status(200).json({ message: "You've successfully updated your profile" })
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

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}