const { rememberPassword } = require('../../logic')
const { NotAllowedError, ContentError } = require('tennis-errors')

module.exports = (req, res) => {
    const { body: {email} } = req

    try {
        rememberPassword(email)
            .then(() => {
                res.status(200).json({message :'Your password has been sended to your email address' })
            })
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