const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reservations = require('./modelReservations').reservationsSchema

const ReservationObjectSchema = new Schema({
    objectName: {
        type: String
        //required: true
    },
    reservations: {
        type: [Reservations], //TODO for today=[0], for tomorrow=[1]????
        default: [{person: null, date: Date.now(), timeFrom: 10, timeTo: 13},
            {person: null, date: Date.now(), timeFrom: 13, timeTo: 16},
            {person: null, date: Date.now(), timeFrom: 16, timeTo: 19},
            {person: null, date: Date.now(), timeFrom: 19, timeTo: 22}]
    }
});

module.exports = mongoose.model("ReservationObject", ReservationObjectSchema);