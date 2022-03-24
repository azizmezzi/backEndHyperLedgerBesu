
//During the test the env variable is set to test

process.env.NODE_ENV = "test";

let Users = require("../models/Users");
var server = 'http://localhost:3001';

//Require the dev-dependencies



let chai = require("chai");

let chaiHttp = require("chai-http");

//let server = require("../bin/auth");

chai.use(chaiHttp);

let should = chai.should();
var expect = chai.expect;



describe("Auth", () => {
/*

beforeEach(done => {

    //Before each test we empty the database



    Users.findOne({}, err => {

      done();

    });

  });
*/

 describe("/POST AdherentSignUp", () => {

    it("it should register a member (Adherent)", done => {

      chai

        .request(server)



        .post("/adherentsignup")



        .send({ email:"testrr@gmail.com",
            firstname:"testrr",
            lastname:"testrr",
            password:"1234testrr",
            Address:"testrr",
            username:"testrr",
	    role:"adherent"
        })



        .end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });

 describe("/POST AgentSignUp", () => {

    it("it should register a member (Agent)", done => {

      chai

        .request(server)



        .post("/agentsignup")



        .send({ email:"testee@gmail.com",
            firstname:"testee",
            lastname:"testee",
	    agence: "Tunis",
	    role:"agent",
            password:"1234testee",
            Address:"testee",
            username:"testee"
        })



        .end((err, res) => {

          res.should.have.status(200);
          res.body.should.be.a("object");



          done();

        });

    });

  });






describe("/POST AdherentLogin", () => {

    it("it should connect a member (Adherent)", done => {

      chai

        .request(server)



        .post("/adherentlogin")



        .send({ email:"mm@gmail.com",
            password:"1234mm",
          
        })



        .end((err, res) => {

//          res.should.have.status(800);
 expect(res.status).to.equal(200); 
          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });









describe("/GET Adherent :wallet", () => {

    it("It should GET adherent's details by the given address", done => {

      chai

        .request(server)



        .get("/getAdherentbyAdrr?wallet=0xa109D14cc7c807349835777759Ec5636Fd326C70")



        .end((err, res) => {

//          res.should.have.status(200);

expect(res.status).to.equal(200); 

          res.body.should.be.a('object');



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });







 describe("/GET Agent: id", () => {

    it("it should GET Agent by the given id", done => {

      chai

        .request(server)



        .get("/getAgent?id=3")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });
  });
  });




 describe("/GET Adherent: Id", () => {

    it("it should GET Adherent by the given Id", done => {

      chai

        .request(server)



        .get("/getAdherentbyID?idAD=2")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });
  });
  });




 })
