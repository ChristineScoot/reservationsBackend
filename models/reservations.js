const mongoose = require("mongoose");
const { Schema } = require('mongoose')

const ReservationSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    from:{
        type: Date,
        default: Date.now
    },
    to:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Reservation", ReservationSchema);