const server = require('../app')
const User = require('../models/user').model
const ReservationObject = require('../models/reservationObject').model
// const mongoose = require('../config/db)

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http')

const should = chai.should();

chai.use(chaiHttp);
let user = {
    email: 'piiit@test.com',
    name: 'Jan',
    surname:'Kowalski',
    role: 'admin',
    room: '11',
    role: 'user',
    canReserve: 'true',
    password: '123456789'
}
let userID;

describe('User and Reservation Object test', () => {
    token = '';
    objectID= ' ';

// // describe('Car', () => {
// //     token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTEwN2RjZjg2YWY5MjJlNGExNGIyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTQ0NjE5OTk2fQ.N03Lek8zYO1rtQ8Wzm0ZHZi0tqB8VQ23DtyA55vrlYo'
// //
//     before((done) => { //Before each test we empty the database
//         User.deleteMany({}, (err) => {
//             ReservationObject.deleteMany({}, (err) => {
//                 done();
//             })
//
//         });
//     });

    describe('POST /user/register', () => {
        it('It should register user.', (done) => {

            chai.request(server)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);

                    res.body.should.have.property('message').equal('User created');
                    done();
                });
        });
    })

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
    describe('GET /user', () => {
        it('It should get object information', (done) => {
            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('name');
                    userID = res.body[0]._id;
                    done();
                });
        });
    });
    describe('DELETE /user/:id', () => {
        it('It should delete user', (done) => {
            chai.request(server)
                .get('/user/'+userID)
                .end(function(err,res){
                    chai.request(server)
                        .delete('/user/'+ userID)
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



    describe('GET /object', () => {
        it('It should get object information', (done) => {
            chai.request(server)
                .get('/object')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('name');
                    objectID = res.body[0]._id
                    done();
                });
        });
    });
    describe('DELETE /object/:id', () => {
        it('It should delete car', (done) => {
            chai.request(server)
                .get('/object/'+objectID)
                .end(function(err,res){
                    chai.request(server)
                .delete('/object/'+ objectID)
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


    describe('POST /user/login', () =>{
       it('It should log in', (done) =>{
           chai.request(server)
               .post('/user/login')
               .send(user)
               .end((err, res) => {
                   res.should.have.status(201);
                   res.body.should.have.property("message").equal("Auth successful");
                   res.body.should.have.property("token");
               })
       })
    });
});
