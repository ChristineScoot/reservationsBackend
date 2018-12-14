const Person = require("../models/person");
var mongooose = require('mongoose');


exports.listAllPeople = (req, res) => {
    Person.find({}, (err, person) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(person);
    });
};

exports.createNewPerson = ({body}, res) => {
    let newObject = new Person(body);
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

exports.updatePerson = (req, res) => {
    Person.findOneAndUpdate(
        {_id:  mongooose.Types.ObjectId(req.params.personid)},
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

exports.deletePerson = (req, res) => {
    Person.deleteOne({_id: mongooose.Types.ObjectId(req.params.personid)}, (err, person) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({message: "Person successfully deleted"});
    });
};