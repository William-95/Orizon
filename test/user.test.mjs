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

describe("User Api Testing", () => {
  before(async function () {
    await createTestDb();
  });

  after(async function () {
    await deleteTestDb();
  });
  // Test GET
  it("GET: read user list", (done) => {
    chai
      .request(app)
      .get("/api/user")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res).to.have.status(200);
        done();
      });
  });
  // Test POST
  it("POST: create new user", (done) => {
    let newUser = {
      id: 1,
      name: "testUser",
      surname: "testUser",
      email: "test@gmail.com",
    };
    chai
      .request(app)
      .post("/api/user")
      .send(newUser)
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
  it("Put: Update user", (done) => {
    let userId = 1;
    let newUser = {
      name: "testUser",
      surname: "testUser",
      email: "test@gmail.com",
    };
    chai
      .request(app)
      .put("/api/user/update/" + userId)
      .send(newUser)
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
  it("DELETE: Delete one user", (done) => {
    let userId = 1;

    chai
      .request(app)
      .delete("/api/user/delete/" + userId)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        done();
      });
  });
});
