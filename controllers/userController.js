const User = require("../models/user");
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.listAllPeople = (req, res) => {
    User.find({}, (err, person) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(person);
    });
};


exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {

            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password : hash,
                            name: req.body.name,
                            surname: req.body.surname,
                            room: req.body.room,
                            canReserve: true,
                            role: req.body.role,
                        });
                        user
                            .save()
                            .then(result => {
                                //console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};


exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            //No such users found
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication error."
                });
            }
            //we found a user so we want to check password:
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {const token = jwt.sign(
                        {
                            userId: user[0]._id,
                            name: user[0].name,
                            surname: user[0].surname,
                            email: user[0].email,
                            role: user[0].role

                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "24h"
                        }
                    );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            }
        })
        .catch(err =>{
            return res.status(500).json({
                message: err
            });
        })
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