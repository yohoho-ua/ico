process.env.NODE_ENV = 'test';


// var expect  = require("chai").expect;
// var request = require("request");
var config = require('../config/database').get(process.env.NODE_ENV);
//let mongoose = require("mongoose");
var User = require("../models/user");
var Wallet = require("../models/wallet");
var passport = require('passport');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('users', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
                done();
        });

    });


    /*
     * Test the get / route
     */
    describe('/GET', () => {
        it('it should GET under construction page', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Page under construction.");
                    done();
                });
        });
    });


    /*
     * Test the /signin route when database empty
     */
    describe('/POST signin when database is empty', () => {
        it('it should not sign in and should return success: FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signin')
                .type('json')
                .send({
                    email: "any",
                    password: "any"
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Authentication failed. User not found.');
                    done();
                });
        });
    });

    /*
     * Test the /signup route without password
     */
    describe('/POST signup without email', () => {
        it('it should NOT signup and should return success: FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signup')
                .type('json')
                .send({
                    email: "",
                    password: "test"
                })
                .end((err, res) => {
                    //console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Please pass email and password.');
                    done();
                });
        });
    });

    /*
     * Test the /signup route without password
     */
    describe('/POST signup without password', () => {
        it('it should NOT signup and should return success: FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signup')
                .type('json')
                .send({
                    email: "test",
                    password: ""
                })
                .end((err, res) => {
                    //console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Please pass email and password.');
                    done();
                });
        });
    });

    /*
     * Test the /signup route with proper email and password
     */
    describe('/POST signup good', () => {
        it('it should signup and return success: TRUE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signup')
                .type('json')
                .send({
                    email: "test",
                    password: "test"
                })
                .end((err, res) => {
                    //console.log(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('msg').eql('Successful created new user.');
                    res.body.should.have.property('user_id').be.a('string');
                    done();
                });
        });
    });


    /*
     * Test the /signup route with existent email
     */
    describe('/POST signup email exists', () => {
        it('it should NOT signup and should return FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signup')
                .type('json')
                .send({
                    email: "test",
                    password: "test"
                })
                .end((err, res) => {
                    console.log(res.body.msg);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('email already exists.');
                    done();
                });
        });
    });


    /*
     * Test the /signin route with wrong email
     */
    describe('/POST signin wrong email', () => {
        it('it should NOT sign and should NOT return Token, it should return success: FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signin')
                .type('json')
                .send({
                    email: "bad",
                    password: "test"
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Authentication failed. User not found.');
                    res.body.should.not.have.property('token')
                    done();
                });
        });
    });

    /*
     * Test the /signin route with wrong password
     */
    describe('/POST signin wrong pass', () => {
        it('it should NOT sign and should NOT return Token, it should return success: FALSE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signin')
                .type('json')
                .send({
                    email: "test",
                    password: "bad"
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('msg').eql('Authentication failed. Wrong password.');
                    res.body.should.not.have.property('token')
                    done();
                });
        });
    });

   

    /*
     * Test the /signin route with good email and  password 
     */
    describe('/POST signin good', () => {
        it('it should sign and return Token, in should return success: TRUE and proper msg', (done) => {
            chai.request(server)
                .post('/api/signin')
                .type('json')
                .send({email:"test",password:"test"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('token').include('JWT ');
                    done();
                });
        });
    });


});