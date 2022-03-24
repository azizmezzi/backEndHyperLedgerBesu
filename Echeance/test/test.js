//During the test the env variable is set to test



process.env.NODE_ENV = "test";

//let Users = require("../models/Users");



//Require the dev-dependencies



let chai = require("chai");

let chaiHttp = require("chai-http");

//let server = require("../bin/Cashin");
var server = 'http://localhost:3004';

var expect = chai.expect;

let should = chai.should();

chai.use(chaiHttp);







describe("PaymentDeadline", () => {

/*  beforeEach(done => {

    //Before each test we empty the database



    Users.findOne({}, err => {

      done();

    });

  });



*/


 describe("/GET BalanceOf", () => {

    it("it should GET member's balance", done => {

      chai
 
        .request(server)



        .get("/balanceOf?owner=0xa109D14cc7c807349835777759Ec5636Fd326C70")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });







 describe("/GET DeadlinesIndexes", () => {

    it("it should GET member's PD by the given address", done => {

      chai

        .request(server)



        .get("/getDeadlinesIndexes?borrower=0xa109D14cc7c807349835777759Ec5636Fd326C70")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });







 describe("/GET DeadlinesInfo", () => {

    it("it should GET member's PD details by the given id", done => {

      chai

        .request(server)



        .get("/getDeadlineInfo?id=1&borrower=0xa109D14cc7c807349835777759Ec5636Fd326C70")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });







 describe("/POST AddPDL", () => {

    it("it should add PDL", done => {

      chai

        .request(server)



        .post("/AddPaymentDeadline")


	 .send({ borrower:"0xa109D14cc7c807349835777759Ec5636Fd326C70",
		privateKey:"db6bb6b76ed4abb85a3d3e027b9fd160425a64ab479ee5787ae7112369549663fed1e6c9e68abaff427e4bc2cb3117e5048eea7b9dc700bc850ab3c3fe945586ca054c2ed6d3baac5c920b6ee392cab40d8139194d7943d04f4e81a8bbb842cb2658d9c6e23ed3d51ce8cbe5424bde361ae072ef01a993bbc78e6098841521ab20239a4d9d2e43607199c0ce0f3190150791ecd8ef83af4400ce0c9781577c2b28f6",
	 	DateDeadline:"1584722402",
		id_loan:"15",
		amount:"20",
		sender:"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"        
})


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });







 describe("/POST AccomplishEcheance", () => {

    it("it should pay member's PDL", done => {

      chai

        .request(server)




        .post("/accomplishEcheance")


         .send({ borrower:"0xa109D14cc7c807349835777759Ec5636Fd326C70",
		privateKey:"05b2961f0117e6a9183447172f2d74c29ee3bda04f890c2a6c373c3fcd7269e8ec0bcbac04fb075923fb8b3882040fb3484c045165205fa87abc7491119d48049174f1ef7ef3b8a00f8806718d52ee1bf32e56ba0282d901ce4327b033c0fb943c7eec666e0e0c5dfcbd354c76b87bbb1c2b1895c004ba3acd24911c9e13c6b3517f2093ceddf38991f1c279ec42a0607b5519efbdd292fd18b743313560de0ee1e9",
                id:"8",
                amout:"20"
                
})



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });




describe("/POST IntermediatePayEcheance", () => {

    it("it should pay member's PDL by agent", done => {

      chai

        .request(server)




        .post("/intermediatePayEcheance")


         .send({ charger:"0xa109D14cc7c807349835777759Ec5636Fd326C70",
                privateKey:"0fb1fd3ee08b854a6887e7894058575816714f37be2427601024dd16b5b2bb10428f8a44e37c35d46affc1ad0aa4670dfd4f53f3f49fa99e4e7086e52caacd57cb479487e3a394fe81a089be399024d84f265789faceb457160c8395a521730ab39dbffd1dd864c1526bf2bb5a598d2acda8121258ecfe65195621ca8c4ba47646e783b6b35d90d926db0f7d4373463b95d36771c7bf2d0f410e42f474ad7cf52459",
		intermediate:"0x89469757146974C1c7a14EE6f420a6F6A2469711",    
            id:"9",
                amout:"20"

})



        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          done();

        });

    });

  });


/*





 describe("/GET DeadlinesIndexes", () => {

    it("it should GET member's PD by the given address", done => {

      chai

        .request(server)



        .get("/getDeadlinesIndexes?borrower=0xa109D14cc7c807349835777759Ec5636Fd326C70")


        .end((err, res) => {


          expect(res.status).to.equal(200); 

          res.body.should.be.a('object');


          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });

*/






})
