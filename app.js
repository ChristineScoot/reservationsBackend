const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controllers/taskController");

require("./config/db");
const app = express();

const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
    .route("/tasks")
    .get(taskController.listAllTasks)
    .post(taskController.createNewTask);

app
    .route("/tasks/:taskid")
    .get(taskController.readTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});