

//During the test the env variable is set to test



process.env.NODE_ENV = "test";

let Users = require("../models/Users");



//Require the dev-dependencies



let chai = require("chai");

let chaiHttp = require("chai-http");

//let server = require("../bin/Cashin");
var server = 'http://localhost:3002';

var expect = chai.expect;

let should = chai.should();

chai.use(chaiHttp);







describe("Cashin", () => {

/*  beforeEach(done => {

    //Before each test we empty the database



    Users.findOne({}, err => {

      done();

    });

  });



*/


 describe("/POST New Cashin", () => {

    it("it should POST new cashin", done => {

      chai

        .request(server)



        .post("/newCashin")



        .send({ reciver:"0xE77A58298f2a934BdB08bdD0DB087Bc54c725FD1",
        amount:"100",
        privateKey:"db6bb6b76ed4abb85a3d3e027b9fd160425a64ab479ee5787ae7112369549663fed1e6c9e68abaff427e4bc2cb3117e5048eea7b9dc700bc850ab3c3fe945586ca054c2ed6d3baac5c920b6ee392cab40d8139194d7943d04f4e81a8bbb842cb2658d9c6e23ed3d51ce8cbe5424bde361ae072ef01a993bbc78e6098841521ab20239a4d9d2e43607199c0ce0f3190150791ecd8ef83af4400ce0c9781577c2b28f6",
        nom_reciver:"Zaghdoudi",
        prenom_reciver:"Bilel",
        id_reciver:"27",
        sender:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        lnamesender:"test",
        fnamesender:"test",
        unqIdsender:"2",
        amountFiat:"100"

       })



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });


  describe("/GET TransferInfo :sender", () => {

    it("it should GET transfer's info by the given address", done => {

      chai

        .request(server)



        .get("/getTransferInfoBySender?sender=0xa109D14cc7c807349835777759Ec5636Fd326C70")


       .end((err, res) => {


 expect(res.status).to.equal(200); 



          res.body.should.be.a("array");


          done();

        });

    });

  });



  describe("/POST New Transfer", () => {

    it("it should POST new transfer", done => {

      chai

        .request(server)



        .post("/newTransfer")



        .send({ reciver:"0xE77A58298f2a934BdB08bdD0DB087Bc54c725FD1",
        amount:"100",
        id_reciver:"27",
        privateKey:"db6bb6b76ed4abb85a3d3e027b9fd160425a64ab479ee5787ae7112369549663fed1e6c9e68abaff427e4bc2cb3117e5048eea7b9dc700bc850ab3c3fe945586ca054c2ed6d3baac5c920b6ee392cab40d8139194d7943d04f4e81a8bbb842cb2658d9c6e23ed3d51ce8cbe5424bde361ae072ef01a993bbc78e6098841521ab20239a4d9d2e43607199c0ce0f3190150791ecd8ef83af4400ce0c9781577c2b28f6",
        lnamesender:"test",
        fnamesender:"test",
        idsender:"2",
        sender:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    
       })



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          done();

        });

    });

  });


/*

 describe("/GET Transfer Info", () => {

    it("it should GET Transfer's Info", done => {

      chai

        .request(server)



        .post("/getTransferInfo")



        .send({ id:"0"
       })



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          done();

        });

    });

  });


*/





/*
describe("/GET CashIn Info", () => {

    it("it should GET CashIn's Info", done => {

      chai

        .request(server)



        .post("/getcashInInfo")



        .send({ id:"0"
       })



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          done();

        });

    });

  });

*/







  


})
