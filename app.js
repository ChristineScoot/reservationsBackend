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
    .get(objectController.listAllObject)
    .post(objectController.createNewObject);

app
    .route("/object/:objectid")
    .put(objectController.updateObject)
    .delete(objectController.deleteObject);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});