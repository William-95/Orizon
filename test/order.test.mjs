process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import sinonChai from "sinon-chai";
import { createTestDb, deleteTestDb } from "./testSetup.js";
import app from "../app.js";

chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe("Order Api Testing", () => {
  before(async function () {
    await createTestDb();
  });

  after(async function () {
    await deleteTestDb();
  });
  // Test GET
  it("GET: read order list", (done) => {
    chai
      .request(app)
      .get("/api/orders")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res).to.have.status(200);
        done();
      });
  });
  // Test POST
  it("POST: create new order", (done) => {
    let newOrder = {
      products: "2",
      users: "2",
    };
    chai
      .request(app)
      .post("/api/orders")
      .send(newOrder)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  // Test UPDATE
  it("Put: Update order", (done) => {
    let orderId = 1;
    let newOrder = {
      products: "2",
      users: "2",
    };
    chai
      .request(app)
      .put("/api/orders/update/" + orderId)
      .send(newOrder)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  // Test DELETE
  it("DELETE: Delete one order", (done) => {
    let orderId = 1;

    chai
      .request(app)
      .delete("/api/orders/delete/" + orderId)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        done();
      });
  });
  //  Test Filter by Date
  it("GET: Filter By Date", (done) => {
    let date = "2024-01-02";
    chai
      .request(app)
      .get("/api/orders/filter?date=" + date)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  // Test Filter by Products
  it("GET: Filter By Date", (done) => {
    let products = "testProduct";
    chai
      .request(app)
      .get("/api/orders/filter?products=" + products)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
