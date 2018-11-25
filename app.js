const express = require("express");
const bodyParser = require("body-parser");
const objectController = require("./controllers/objectController");
const personController = require("./controllers/personController");
const reservationController = require("./controllers/reservationController");

require("./config/db");
const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//RESERVATION OBJECT
app
    .route("/object")
    .get(objectController.listAllReservationObjects)
    .post(objectController.createNewReservationObject);
app
    .route("/object/:objectid")
    .put(objectController.updateReservationObject)
    .delete(objectController.deleteReservationObject);

//PERSON
app
    .route("/person")
    .get(personController.listAllPeople)
    .post(personController.createNewPerson);
app
    .route("/person/:personid")
    .put(personController.updatePerson)
    .delete(personController.deletePerson);

//RESERVATION
app
    .route("/reservation")
    .post(reservationController.createNewReservation);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});