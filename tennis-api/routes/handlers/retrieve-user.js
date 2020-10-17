const { retrieveUser } = require('../../logic')
const { NotAllowedError } = require('tennis-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrieveUser(id)
            .then(user =>
                res.status(200).json(user)
            )
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 

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