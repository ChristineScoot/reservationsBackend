const ReservationObject = require("../models/reservationObject");
var mongooose = require('mongoose');
var nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');

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

exports.readReservationObject = (req, res) => {
    ReservationObject.findById(mongooose.Types.ObjectId(req.params.objectid), (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(object);
    });
};

exports.updateReservationObject = (req, res) => {
    ReservationObject.findOneAndUpdate(
        {_id: req.params.objectid},
        req.body,
        {new: true},
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


exports.reportFault = (req, res) => {
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'emailsenderii123@gmail.com', //mail
                clientId: '290546485745-ddp6jv1fvvl11h16no9ed9t49479bjku.apps.googleusercontent.com',
                clientSecret: '23Tm7kAD0s1ei6purmqwRlg1',
                refreshToken: '1/orAKquaIM77ixlP3x1JRkBeGXArXW3gdmdfqiWpE7bM'
            })
        }
    }));
    var mailOptions = {
        from: 'Name <emailsenderii123@gmail.com>',//sender email
        to: 'emailsenderii123@gmail.com',
        subject: 'New fault report',
        text: req.body.faultDescription
    };
    transporter.sendMail(mailOptions, function(err, res){
        if(err){
            // res.send(err);
            console.log("TEN ERROR----------------------------------")
            console.log(err)
        }else{
            // res.json({message: "Fault reported"});
            console.log("wyslano")
        }
    })
};