const { success } = require('../services/response/')
const create = ({ body }, res, next) => {
    console.log("Jakies cos")
    success(res)
    // success(res)

    // Author.create(body)
    //     .then((author) => author.view(true))
    //     .then(success(res))
    //     .catch(next)
}


module.exports = {
    create
}
