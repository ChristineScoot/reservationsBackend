const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    room: {
        type: String
    },
    canReserve: {
        type: Boolean,
        default: true
    },
    role: { // user/admin
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model("Person", PersonSchema);