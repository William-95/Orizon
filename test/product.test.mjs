process.env.NODE_ENV = "test";

import chai from "chai";
import chaiHttp from "chai-http";
import sinonChai from "sinon-chai";
import { createTestDb, deleteTestDb } from "./testSetup.js";
import app from "../app.js";

chai.should();
chai.use(chaiHttp);
chai.use(sinonChai);

describe("Product Api Testing", () => {
  before(async function () {
    await createTestDb();
  });

  after(async function () {
    await deleteTestDb();
  });

  // test GET
  it("GET: read product list", (done) => {
    chai
      .request(app)
      .get("/api/product")

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  // Test POST
  it("POST: create new product", (done) => {
    let newProduct = {
      name: "testProduct",
    };

    chai
      .request(app)
      .post("/api/product")
      .send(newProduct)
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
  it("Put: Update product", (done) => {
    let productId = 1;
    let newProduct = {
      name: "testProduct",
    };
    chai
      .request(app)
      .put("/api/product/update/" + productId)
      .send(newProduct)
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
  it("DELETE: Delete one product", (done) => {
    let productId = 1;

    chai
      .request(app)
      .delete("/api/product/delete/" + productId)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        done();
      });
  });
});
