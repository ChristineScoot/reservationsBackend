const express = require("express");
const bodyParser = require("body-parser");
const objectController = require("./controllers/objectController");
const userController = require("./controllers/userController");
const reservationController = require("./controllers/reservationController");
let checkAuth = require("./middleware/check-auth");

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
    .get(objectController.readReservationObject)
    .put(objectController.updateReservationObject)
    .delete(objectController.deleteReservationObject);

// //PERSON
app
    .route("/user")
    .get(userController.listAllPeople)
    .post(userController.createNewUser);
app
    .route("/user/:id")
    .put(userController.updateUser)
    .delete(userController.deleteUser);
app
    .route("/user/register")
    .post(userController.user_signup);
app
    .route("/user/login")
    .post(userController.user_login);

//RESERVATION
app
    .route("/reservation")
    .post(checkAuth, reservationController.createNewReservation)

app
    .route("/reservation/:objectId/:reservationId")
    .delete(reservationController.deleteReservation);

//MAIL WITH flaws-zglaszanie usterek
app
    .route("/flaws")
    .post(objectController.reportFault);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

function stop() {
    server.close()
}
module.exports = app
module.exports.stop = stop