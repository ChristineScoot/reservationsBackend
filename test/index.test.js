const server = require('../app')
const User = require('../models/user').model
const ReservationObject = require('../models/reservationObject').model
// const mongoose = require('../config/db)

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http')

const should = chai.should();

chai.use(chaiHttp);

describe('User and car test', () => {
    token = ''
    objectID= ' '

// // describe('Car', () => {
// //     token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTEwN2RjZjg2YWY5MjJlNGExNGIyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQ0NjE5OTk2fQ.N03Lek8zYO1rtQ8Wzm0ZHZi0tqB8VQ23DtyA55vrlYo'
// //
// //     before((done) => { //Before each test we empty the database
// //         Car.deleteMany({}, (err) => {
// //             done();
// //         });
// //     });
//
    describe('POST /object', () => {
        it('It should add new car.', (done) => {
            let object = {
                name: 'Audi',

            }
            chai.request(server)
                .post('/object')
                .send(object)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name').equal('Audi');
                    res.body.should.have.property('reservations');
                    res.body.reservations.should.be.an('array').to.be.empty;
                    done();
                });
        });
    })

    describe('DELETE /object/:id', () => {
        it('It should delete car', (done) => {
            chai.request(server)
                .get('/object')
                .end(function(err,res){
                    chai.request(server)
                .delete('/object/'+ res.body[0]._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            // res.body.should.be.a('object');
                            // res.body.should.have.property('REMOVED')
                            // res.body[0].should.have.property('_id');
                            // res.body[0].should.have.property('name');
                            // objectID = res.body[0]._id
                            done();
                        });
                })
        });
    });
});
