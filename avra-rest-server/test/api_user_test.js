process.env.NODE_ENV = 'test';


const mongoose = require("mongoose");
const User = require("../models/user");
const Wallet = require("../models/wallet");
var adminUser
var savedUser1;
var savedUser2;
var savedUser3;
var adminToken;
var userToken;
var wallets;

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);


//Our parent block

describe('Users', () => {
    console.log("in describe")
    before((done) => { //Before each test we empty the database
        return User.remove({})
            .then( function() { return Wallet.remove({})})
            .then(function () {
                // create test user 1
                new User({
                    email: 'test',
                    password: 'test',
                    admin: false
                }).save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                  return  savedUser1 = result;
                })
            })
            .then(function () {
                // create test user 2
                new User({
                    email: 'test2',
                    password: 'test2',
                    admin: false
                }).save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                 return savedUser2 = result;
                })
            })
            .then(function () {
                // create test user 3
                new User({
                    email: 'test3',
                    password: 'test3',
                    admin: false
                }).save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                  return savedUser3 = result;
                })
            })
            .then(function () {
                // create test admin
                new User({
                    email: 'admin',
                    password: 'admin',
                    admin: true
                }).save((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                   return admin = result;
                })

            })
            .then(function () {
                //get admin token for testing
                chai.request(server)
                    .post('/api/signin')
                    .type('json')
                    .send({
                        email: "admin",
                        password: "admin"
                    })
                    .end(function (err, res) {
                       return adminToken = res.body.token
                    });
            })
            .then(function () {
                //get user token for testing
                console.log("request")
                chai.request(server)
                    .post('/api/signin')
                    .type('json')
                    .send({
                        email: "test",
                        password: "test"
                    })
                    .end(function (err, res) {
                       return userToken = res.body.token
                    });
            })
            .then( function(){
               
            })

    });


    
    /*
     * Test user api
     */

    describe('/GET all users with admin account', () => {
        it('it should return array of 4 users, status: 200, success: TRUE', (done) => {
            console.log("adminToken " + adminToken)
            console.log("userToken " + userToken)
            chai.request(server)
                .get('/api/user/')
                .set('Authorization', adminToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array').length(4);
                    done()
                })

        });
    })



    // describe('/GET all users without admin account', () => {
    //     it('it should return status: 403, success: FALSE, msg: "Unauthorized"', (done) => {
    //         chai.request(server)
    //             .get('/api/user/')
    //             .set('Authorization', token)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array').length(4);
    //                 done()
    //             })

    //     });
    // })

})



