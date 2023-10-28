const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", () => {
  it("throw an error if accessing the database fails", () => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    expect(AuthController.login)

    User.findOne.restore();
  });
});
