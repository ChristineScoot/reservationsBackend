const server = require('../app')
const User = require('../models/user').model
const ReservationObject = require('../models/reservationObject').model
// const mongoose = require('../config/db)

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http')

const should = chai.should();

chai.use(chaiHttp);

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
//
//     describe('POST /user/register', () => {
//         it('It should register user.', (done) => {
//             let user = {
//                 email: 'test@test.com',
//                 name: 'Jan',
//                 surname:'Kowalski',
//                 role: 'admin',
//                 room: '11',
//                 role: 'user',
//                 canReserve: 'true',
//                 password: '123456789'
//             }
//
//             chai.request(server)
//                 .post('/user/register')
//                 // .set('Authorization', `Bearer ${token}`)
//                 .send(user)
//                 .end((err, res) => {
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('token');
//                     res.body.should.have.property('user');
//                     res.body.should.have.property('_id');
//                     res.body.should.have.property('name').equal('Jan');
//                     res.body.should.have.property('role').equal('user');
//                     res.body.should.have.property('room').equal('11');
//                     res.body.should.have.property('surname').equal('Kowalski');
//                     res.body.should.have.property('canReserve').equal('canReserve');
//                     res.body.should.have.property('email').equal('test@test.com');
//                     res.body.should.have.property('reservations');
//                     res.body.reservations.should.be.an('array').to.be.empty;
//
//                     token = res.body.token
//                     done();
//                 });
//         });
//     })

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
});
