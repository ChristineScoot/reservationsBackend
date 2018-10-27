const { success } = require('../services/response/')
const create = ({ body }, res, next) => {
    console.log("Jakies cos")

    //TODO zmienic na poprawny "return"
    res.render('index', {title: 'TEST'});
    // success(res)

    // Author.create(body)
    //     .then((author) => author.view(true))
    //     .then(success(res))
    //     .catch(next)
}


module.exports = {
    create
}
