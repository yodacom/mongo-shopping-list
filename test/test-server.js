var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server.js");

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe("Shopping List", function () {

	beforeEach(function() {
        items = [];
        setId = 1;
        add("Broad beans"); //0
        add("Tomatoes"); //1
        add("Peppers"); //2
    });

    it("should list items on GET", function (done) {
        chai.request(app)
            .get("/items")
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("array");
                res.body.should.have.length(3);
                res.body[0].should.be.a("object");
                res.body[0].should.have.property("id");
                res.body[0].should.have.property("name");
                res.body[0].id.should.be.a("number");
                res.body[0].name.should.be.a("string");
                res.body[0].name.should.equal("Broad beans");
                res.body[1].name.should.equal("Tomatoes");
                res.body[2].name.should.equal("Peppers");
                done();
            });
    });

    it("should add an item on POST", function (done) {
        chai.request(app)
            .post("/items")
            .send({"name": "Kale"})
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.property("name");
                res.body.should.have.property("id");
                res.body.name.should.be.a("string");
                res.body.id.should.be.a("number");
                res.body.name.should.equal("Kale");
                items.should.be.a("array");
                items.should.have.length(4);
                items[3].should.be.a("object");
                items[3].should.have.property("id");
                items[3].should.have.property("name");
                items[3].id.should.be.a("number");
                items[3].name.should.be.a("string");
                items[3].name.should.equal("Kale");
                done();
            });
    });

    it("should edit an item on PUT", function (done) {
        chai.request(app)
            .put("/items/2")
            .send({"name": "Kale Dog"})
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a("object");
                res.body.should.have.a.property("name");
                res.body.should.have.a.property("id");
                res.body.name.should.be.a("string");
                res.body.id.should.be.a("number");
                res.body.name.should.be.equal("Kale Dog");
                items.should.be.a("array");
                items.should.have.length(3);
                items[1].should.be.a("object");
                items[1].should.have.property("name");
                items[1].should.have.property("id");
                items[1].id.should.be.a("number");
                items[1].name.should.be.a("string");
                items[1].name.should.equal("Kale Dog");
                done();
            });
    });

    it("should delete an item on delete", function (done) {
        chai.request(app)
            .delete("/items/2")
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                storage.items.should.have.length(2);
                done();

            });
    });

    it("POST to an ID that exists");
    it("POST without body data");
    it("POST with something other than valid JSON");
    it("PUT without an ID in the endpoint");
    it("PUT with different ID in the endpoint than the body");
    it("PUT to an ID that doesn't exist ");
    it("PUT without body data");
    it("PUT with something other than valid JSON");
    it("DELETE an ID that doesn't exist");
    it("DELETE without an ID in the endpoint");

});