const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reservations = require('./modelReservations').reservationsSchema
var mongooose = require('mongoose');

const ReservationObjectSchema = new Schema({
    objectName: {
        type: String
        //required: true
    },
    reservations: {
        type: [Reservations], //TODO for today=[0], for tomorrow=[1]????
        default: [{person: mongooose.Types.ObjectId("000000000000"), date: Date.now(), timeFrom: 10, timeTo: 13},
            {person: mongooose.Types.ObjectId("000000000000"), date: Date.now(), timeFrom: 13, timeTo: 16},
            {person: mongooose.Types.ObjectId("000000000000"), date: Date.now(), timeFrom: 16, timeTo: 19},
            {person: mongooose.Types.ObjectId("000000000000"), date: Date.now(), timeFrom: 19, timeTo: 22}]
    }
});

module.exports = mongoose.model("ReservationObject", ReservationObjectSchema);