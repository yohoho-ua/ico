process.env.NODE_ENV = 'test';


let mongoose = require("mongoose");
var User = require("../models/user");
var Wallet = require("../models/wallet");
var savedUser;
var token;
var wallets;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require("chai").expect;

chai.use(chaiHttp);


//Our parent block
describe('Wallets', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
        }).then(Wallet.remove({}, (err) => {
        })).then(function (err) {
            // create test user
            new User({
                email: 'test2',
                password: 'test2'
            }).save((err, result) => {
                if (err) {
                }
                savedUser = result;
            });
        }).then(err => {
            //get token for testing
            chai.request(server)
                .post('/api/signin')
                .type('json')
                .send({
                    email: "test2",
                    password: "test2"
                })
                .end(function (err, res) {
                    token = res.body.token
                    done();
                });
        })
    })

    /*
     * Test creating new wallet
     */

    describe('/GET new wallet with invalid token', () => {
        it('it should return status: 401, success: FALSE, and text: "Unauthorized"', (done) => {
            chai.request(server)
                .get('/api/new_wallet/' + savedUser._id)
                .set('Authorization', "JWT invalid.token.string")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.have.property('text').eql('Unauthorized');
                    done();
                })

        });
    })


    describe('/GET new wallet with invalid user id', () => {
        it('it should return status: 400, success: FALSE, and msg: "Invalid user ID"', (done) => {
            chai.request(server)
                .get('/api/new_wallet/' + savedUser._id + "bad id")
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Invalid user ID');
                    done();
                })

        });
    })


    describe('/GET new wallet with non existent user id', () => {
        it('it should return status: 401, success: FALSE, and msg: "Authentication failed. User not found."', (done) => {
            chai.request(server)
                .get('/api/new_wallet/' + "12345678901234567890ABCD")
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Authentication failed. User not found.');
                    done();
                })

        });
    })



    describe('/GET create new wallet with user id', () => {
        it('it should return wallet json object aasigned to user id, success: TRUE, and msg: "Successful created new wallet."', (done) => {
            chai.request(server)
                .get('/api/new_wallet/' + savedUser._id)
                .set('Authorization', token)
                .end((err, res) => {
                    // console.log('res = ' + JSON.stringify(res))
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').eql('Successful created new wallet.');
                    done();
                })

        });
    })


    describe('/GET create second new wallet with user id', () => {
        it('it should return wallet json object asigned to user id, success: TRUE, and msg: "Successful created new wallet."', (done) => {
            chai.request(server)
                .get('/api/new_wallet/' + savedUser._id)
                .set('Authorization', token)
                .end((err, res) => {
                    // console.log('res = ' + JSON.stringify(res))
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').eql('Successful created new wallet.');
                    done();
                })

        });
    })

    /*
   * Test get all user wallets
   */

    describe('/GET all wallets with invalid token', () => {
        it('it should return status: 401, success: FALSE, and text: "Unauthorized"', (done) => {
            chai.request(server)
                .get('/api/wallet/' + savedUser._id)
                .set('Authorization', "JWT invalid.token.string")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.have.property('text').eql('Unauthorized');
                    done();
                })

        });
    })


    describe('/GET all user wallets with invalid user id', () => {
        it('it should return status: 400, success: FALSE, and msg: "Invalid user ID"', (done) => {
            chai.request(server)
                .get('/api/wallet/' + savedUser._id + "bad id")
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Invalid user ID');
                    done();
                })

        });
    })

    describe('/GET all user wallets with non existent user id', () => {
        it('it should return status: 401, success: FALSE, and msg: "Authentication failed. User not found."', (done) => {
            chai.request(server)
                .get('/api/wallet/' + "12345678901234567890ABCD")
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array').length(0);
                    done();
                })

        });
    })


    describe('/GET all user wallets with user id', () => {
        it('it should return wallets array of proper length, success: TRUE', (done) => {
            chai.request(server)
                .get('/api/wallet/' + savedUser._id)
                .set('Authorization', token)
                .end((err, res) => {
                    // console.log('res = ' + JSON.stringify(res.body))
                    wallets = res.body // for delete tests
                    res.should.have.status(200);
                    res.body.should.be.a('array').length(2);
                    done();
                })

        });
    })


    /*
   * Delete user wallet
   */

    describe('/DELETE wallet with wallet id', () => {
        it('it should return status: 200, success: TRUE.', (done) => {
            chai.request(server)
                .delete('/api/wallet/' + wallets[0]._id)
                .set('Authorization', token)
                .end((err, res) => {
                    // console.log('res = ' + JSON.stringify(res.body))
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                })

        });
    })

    /*
   * Get wallets after deletion
   */

    describe('/GET all user wallets with user id', () => {
        it('it should return wallets array of proper length, success: TRUE', (done) => {
            chai.request(server)
                .get('/api/wallet/' + savedUser._id)
                .set('Authorization', token)
                .end((err, res) => {
                    // console.log('res = ' + JSON.stringify(res.body))
                    res.should.have.status(200);
                    res.body.should.be.a('array').length(1);
                    done();
                })

        });
    })



    describe('/DELETE wallet with bad wallet id', () => {
        it('it should return status: 400, success: FALSE, and msg: "Invalid wallet ID"', (done) => {
            chai.request(server)
                .delete('/api/wallet/' + "bad wallet id")
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Invalid wallet ID');
                    done();
                })

        });
    })

    describe('/DELETE wallet with invalid token', () => {
        it('it should return status: 401, success: FALSE, and text: "Unauthorized"', (done) => {
            chai.request(server)
                .delete('/api/wallet/' + wallets[1]._id)
                .set('Authorization', "JWT invalid.token.string")
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.have.property('text').eql('Unauthorized');
                    done();
                })
        });
    })
})