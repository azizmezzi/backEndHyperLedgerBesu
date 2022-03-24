//During the test the env variable is set to test



process.env.NODE_ENV = "test";



let faker = require("faker");



let mongoose = require("mongoose");



let Users = require("../models/Users");



//Require the dev-dependencies



let chai = require("chai");



let chaiHttp = require("chai-http");


let server='http://localhost:3005';
//let server = require("../bin/Tontine");


var expect = chai.expect;
let should = chai.should();



chai.use(chaiHttp);



//Our parent block



describe("Tontine", () => {

/*  beforeEach(done => {

    //Before each test we empty the database



    Users.findOne({}, err => {

      done();

    });

  });

*/




  describe("/GET Tontine :ID_Tontine", () => {

    it("it should GET tontine by the given id", done => {

      chai

        .request(server)



        .get("/getTontine?ID_Tontine=Test58")


       .end((err, res) => {


 expect(res.status).to.equal(200); 



          res.body.should.be.a("object");


          done();

        });

    });

  });



  /*

   * impossible de faire le test de requete create tontine

   */



  describe("/GET getNumPartTontine :ID_Tontine", () => {

    it("It should get tontine's total participants by the given id", done => {

      chai

        .request(server)



        .get("/getNumPartTontine?ID_Tontine=Test58")


        .end((err, res) => {

          expect(res.status).to.equal(200); 



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });

  
  describe("/GET DateLancement :ID_Tontine", () => {

    it("It should get tontine's current state by the given id", done => {

      chai

        .request(server)



        .get("/getDateLancement?ID_Tontine=Test58")


        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");


          done();

        });

    });

  });

  describe("/GET User from DB", () => {

    it("It should get User from DB", done => {

      chai

        .request(server)



        .get("/getUserDB")



        .send({ wallet: "0x6Bf1feCF981480248311daAe9eF25cc2a7Aebb10" })



        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });

  describe("/GET User By Email from DB", () => {

    it("It should get User by email from DB", done => {

      chai

        .request(server)



        .get("/getUserDyEmail")



        .send({ email: "Qq@gmail.com" })



        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });



  describe("/GET getSomme", () => {

    it("Recupere la total somme  à distribué par mois", done => {

      chai

        .request(server)



        .get("/getSomme")



        .send({ ID_Tontine: "test" })



        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });



  describe("/POST cotisation", () => {

    it("Permet le remplissage de la cotisation ", done => {

      chai

        .request(server)



        .post("/cotisation")

        .send({

          //email: faker.internet.email() ,



          address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",



          privateKey:

            "db6bb6b76ed4abb85a3d3e027b9fd160425a64ab479ee5787ae7112369549663fed1e6c9e68abaff427e4bc2cb3117e5048eea7b9dc700bc850ab3c3fe945586ca054c2ed6d3baac5c920b6ee392cab40d8139194d7943d04f4e81a8bbb842cb2658d9c6e23ed3d51ce8cbe5424bde361ae072ef01a993bbc78e6098841521ab20239a4d9d2e43607199c0ce0f3190150791ecd8ef83af4400ce0c9781577c2b28f6",



          ID_Tontine: "test"



          //Nom_Tontine : faker.name.findName() ,



          //    Montant : 1 ,



          //  Nbr_participants : faker.random.number() ,



          //Nbr_cycles : faker.random.number() ,



          //    Frequence : 'mois' ,

        })



        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });


  describe("/POST Recharge Garantie", () => {

    it("Permet le recharge de garantie ", done => {

      chai

        .request(server)



        .post("/RechargeGarantie")

        .send({

          privateKey:

            "db6bb6b76ed4abb85a3d3e027b9fd160425a64ab479ee5787ae7112369549663fed1e6c9e68abaff427e4bc2cb3117e5048eea7b9dc700bc850ab3c3fe945586ca054c2ed6d3baac5c920b6ee392cab40d8139194d7943d04f4e81a8bbb842cb2658d9c6e23ed3d51ce8cbe5424bde361ae072ef01a993bbc78e6098841521ab20239a4d9d2e43607199c0ce0f3190150791ecd8ef83af4400ce0c9781577c2b28f6",

          Adherent_Address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",

//	 address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",

          ID_Tontine: "test"

        })



        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });


  describe("/GET getParticipant :address", () => {

    it("It should GET participant's details by the given id", done => {

      chai

        .request(server)



        .get("/getParticipant?address=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73")


        .end((err, res) => {

          res.should.have.status(200);



          res.body.should.be.a("object");



          //                  res.body.length.should.be.eql(0);



          done();

        });

    });

  });




});



