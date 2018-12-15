const ReservationObject = require("../models/reservationObject");
const User = require("../models/user");
var mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createNewReservation = async (req, res, next) => {
    const {from, to} = req.body
    const user = await User.findById(req.body.userId).exec()
    let object = await ReservationObject.findById(req.body.objectId).exec()
    const reservationId = ObjectId()

    // Sprawdz daty
    const fromDate = new Date(from)
    const toDate = new Date(to)

    if(toDate.getTime() <= fromDate.getTime())
        return res.status(400).json({errors: ['The end date must be greater than or equal to the rental date.']});

    const now = new Date()
    if(fromDate.getTime() <= now.getTime())
        return res.status(400).json({errors: ['It is not possible to rent a car from the past']});

            // for(let i =0; i<object.reservations.length; i++){
            //     if((object.reservations[i].from<=from && object.reservations[i].to<= from) ||
            //         (object.reservations[i].from<=to && object.reservations[i].to<= to ||
            //             (object.reservations[i].from >= from && object.reservations[i].to <= to ))){
            //         return res.status(409).json({
            //             message: "Reservation is impossible.",
            //             ReservationObject: object
            //         });
            //     }
            // }
            try {
                object.reservations.push({
                    _id: reservationId,
                    user: user._id,
                    from,
                    to
                })
            }catch(e){
                return res.status(400).end();
            }

    user.reservations.push(reservationId)

    {
        await user.save()
        await object.save()
        res.status(201).json(object);
    }

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