const supertest = require('supertest');
const server = require('../app');
const chai = require("chai");
const chaiHttp = require("chai-http");
//Assertion
chai.should()

chai.use(chaiHttp);

describe("User API", () => {
    describe("POST /register", () => {
        it("get all the listed", (done) => {
            chai.request(server).post('/api/register').send({
                "teacher": "ataa12312esst@hoo.com",
                "students": ["delete@student.com"]
            }).end((err, response) => {
                response.should.have.status(204);
                done();
            });
        })
    })

    describe("POST /retrievefornotations", () => {
        it("retrievefornotations", (done) => {
            chai.request(server).post('/api/retrievefornotations').send({
                "teacher": "ataaesst@hoo.com",
                "notification": "HELLO , @test123@add.com, @meow@meow.com"
            }).end((err, response) => {
                response.should.have.status(200);
                done();
            });
        })
    })

    describe("POST /suspend", () => {
        it("suspend", (done) => {
            chai.request(server).post('/api/suspend').send({
                "student": "delete@student.com"
            }).end((err, response) => {
                response.should.have.status(204);
                done();
            });
        })
    })

    describe("GET /commonStudents?teachers=ataa12312esst@hoo.com&teachers=meow@hoo.com", () => {
        it("commonStudents", (done) => {
            chai.request(server).get('/api/commonStudents?teachers=ataa12312esst@hoo.com&teachers=meow@hoo.com').send({
                "student": "test1"
            }).end((err, response) => {
                response.should.have.status(200);
                done();
            });
        })
    })




})
