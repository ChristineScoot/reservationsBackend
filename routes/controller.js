const { success } = require('../services/response/')
const createObject = ({ body }, res, next) => {
    //TODO czy w body sa wszystkie info???
    console.log("Dodaje objekt do bazy")

    //TODO zmienic na poprawny "return"
    res.render('index', {title: 'TEST'});
    // success(res)

    // Author.createObject(body)
    //     .then((author) => author.view(true))
    //     .then(success(res))
    //     .catch(next)
}
const createReservation = ({ body }, res, next) => {


    console.log("Dodaje rezerwacje do bazy")

    //TODO zmienic na poprawny "return"
    res.render('index', {title: 'TEST'});
}
const deleteReservation = ({ params }, res, next) => {
    console.log("Bede usuwac rezerwacje o nr " + params.id)
    res.render('index', {title: 'TEST'})
}
module.exports = {
    createObject: createObject,
    createReservation: createReservation,
    deleteReservation: deleteReservation
}
