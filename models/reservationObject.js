const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reservation = require('./reservations').reservationsSchema;
const Person = require('./user').PersonSchema;
var mongooose = require('mongoose');

const ReservationObjectSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    reservations: {
        type: [Reservation],
        required: false
    }
});

module.exports = mongoose.model("ReservationObject", ReservationObjectSchema);