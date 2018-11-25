const ReservationObject = require("../models/reservationObject");
const Person = require("../models/person");
var mongooose = require('mongoose');


// exports.listAllReservationObjects = (req, res) => {
//     ReservationObject.find({}, (err, object) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).json(object);
//     });
// };

exports.createNewReservation = ({body}, res) => {
    //pobierz obiekt
    ReservationObject.findById(mongooose.Types.ObjectId(body.objectId), (err, object) => {
        if (err) {
            res.status(500).send(err);
        }
        if(object.reservations[body.timeRange].person!=null){
            //nie można rezerwować
            res.status(500).json({message:"Cannot reserve during that time"});
        }
        console.log(object);
        //pobierz osobę
        Person.findById(mongooose.Types.ObjectId(body.personId), (err, person) => {
            if (err) {
                res.status(500).send(err);
            }
            if(person.canReserve){
                //rezerwuj!!!
                var updatedObject=object;
                updatedObject.reservations[body.timeRange].person=person;
                console.log(updatedObject.reservations[body.timeRange]);
                console.log("\n\n\n\n");
                console.log(mongooose.Types.ObjectId(body.objectId));
                //zapisz w bazie
                //TODO canReserve w personie !!!!!!!!!!! na false !!!!!!!!!
                // ReservationObject.update({_id:body.objectId}, {reservations: updatedObject.reservations});

ReservationObject.findOneAndUpdate({_id:mongooose.Types.ObjectId(body.objectId)}, {$set:{"reservations.$.person": body.personId}});
                // ReservationObject.findOneAndUpdate(mongooose.Types.ObjectId(body.objectId), updatedObject);




                // ReservationObject.findOneAndUpdate({ _id: req.params.objectid }
                //
                //
                // ReservationObject.findOneAndUpdate(
                //     { _id: req.params.objectid },
                //     req.body,
                //     { new: true },
                //     (err, object) => {
                //         if (err) {
                //             res.status(500).send(err);
                //         }
                //         res.status(200).json(object);
                //     }
                // );






                res.status(200).json({message: "Reservation successfully added"});
            }
            // console.log(person);
        });
    });
    //var reservationObject = ReservationObject.findById(mongooose.Types.ObjectId(body.objectid));
    // var person = Person.findById(mongooose.Types.ObjectId(body.personid));
    // console.log("Object= " + reservationObject.objectName);
    // console.log("Person= " + person.objectName);
    // res.status(201);


    // let newObject = new ReservationObject(body);
    // newObject.save((err, object) => {
    //     if (err) {
    //         res.status(500).send(err);
    //     }
    //     res.status(201).json(object);
    // });
};

// exports.readReservationObject = (req, body) => {
//     ReservationObject.findById(req.params.objectid, (err, object) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         res.status(200).json(object);
//     });
// };
//
// exports.updateReservationObject = (req, res) => {
//     ReservationObject.findOneAndUpdate(
//         { _id: req.params.objectid },
//         req.body,
//         { new: true },
//         (err, object) => {
//             if (err) {
//                 res.status(500).send(err);
//             }
//             res.status(200).json(object);
//         }
//     );
// };
//
// exports.deleteReservationObject = (req, res) => {
//     ReservationObject.remove({_id: req.params.objectid}, (err, object) => {
//         if (err) {
//             res.status(404).send(err);
//         }
//         res.status(200).json({message: "ReservationObject successfully deleted"});
//     });
// };