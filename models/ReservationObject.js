const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationObjectSchema = new Schema({
    objectName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ReservationObject", ReservationObjectSchema);