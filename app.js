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

app.use(function (req,res,next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.get('*',function(req,res,next){
    res.locals.user = req.user || null;
    next();
});

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
    .route("/users")
    .get(userController.listAllPeople)
app
    .route("/user")
    .get(userController.listUserReservations)
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


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});