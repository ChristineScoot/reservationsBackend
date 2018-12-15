const User = require("../models/user");
var mongoose = require('mongoose');


exports.listAllPeople = (req, res) => {
    User.find({}, (err, person) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(person);
    });
};

exports.createNewUser = ({body}, res) => {
    let newObject = new User(body);
    newObject.save((err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(object);
    });
};

// exports.readReservationObject = (req, body) => {
//     ReservationObject.findById(req.params.objectid, (err, object) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).json(object);
//     });
// };

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id:  mongoose.Types.ObjectId(req.params.id)},
        req.body,
        {new: true},
        (err, person) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(person);
        }
    );
};

exports.deleteUser = (req, res) => {
    User.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}, (err, user) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({message: "Person successfully deleted"});
    });
};