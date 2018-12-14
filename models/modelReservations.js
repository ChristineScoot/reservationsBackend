const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({

    person:{
        type: Schema.ObjectId,
        ref: 'Person',
        required: true
    },
    day:{
        type: Date
    },
    timeFrom: {
        type: Number
    },
    timeTo:{
        type: Number
    }
});

module.exports = mongoose.model("modelReservations", ReservationSchema);