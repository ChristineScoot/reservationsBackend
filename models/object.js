const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
    objectName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Object", ObjectSchema);