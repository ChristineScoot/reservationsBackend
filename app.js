const express = require("express");
const bodyParser = require("body-parser");
const objectController = require("./controllers/objectController");

require("./config/db");
const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
    .route("/object")
    .get(objectController.listAllReservationObjects)
    .post(objectController.createNewReservationObject);

app
    .route("/object/:objectid")
    .put(objectController.updateReservationObject)
    .delete(objectController.deleteReservationObject);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});