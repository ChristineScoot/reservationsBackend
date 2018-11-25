
const ReservationObject = require("../models/reservationObject");
var mongooose = require('mongoose');


exports.listAllReservationObjects = (req, res) => {
    ReservationObject.find({}, (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(object);
    });
};

exports.createNewReservationObject = ({body}, res) => {
    let newObject = new ReservationObject(body);
    newObject.save((err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(object);
    });
};

exports.readReservationObject = (req, body) => {
    ReservationObject.findById(req.params.objectid, (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(object);
    });
};

exports.updateReservationObject = (req, res) => {
    ReservationObject.findOneAndUpdate(
        { _id: req.params.objectid },
        req.body,
        { new: true },
        (err, object) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(object);
        }
    );
};

exports.deleteReservationObject = (req, res) => {
    ReservationObject.remove({_id: req.params.objectid}, (err, object) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({message: "ReservationObject successfully deleted"});
    });
};