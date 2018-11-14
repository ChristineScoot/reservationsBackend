
const Object = require("../models/object");
var mongooose = require('mongoose');


exports.listAllObject = (req, res) => {
    Object.find({}, (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(object);
    });
};

exports.createNewObject = (req, res) => {
    let newObject = new Object(req.body);
    newObject.save((err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(object);
    });
};

exports.readObject = (req, body) => {
    Object.findById(req.params.objectid, (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(object);
    });
};

exports.updateObject = (req, res) => {
    Object.findOneAndUpdate(
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

exports.deleteObject = (req, res) => {
    Object.remove({_id: req.params.objectid}, (err, object) => {
        if (err) {
            res.status(404).send(err);
        }
        res.status(200).json({message: "Object successfully deleted"});
    });
};