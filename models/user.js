const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type: String,
        required: true
    },
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
    },
    reservations: {
        type: [Schema.ObjectId],
        ref: 'Reservation',
    }
});

module.exports = mongoose.model("Person", UserSchema);