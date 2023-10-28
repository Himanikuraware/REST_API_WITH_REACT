const expect = require("chai").expect;
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/is-auth");

describe("Auth middleware", () => {
  it("should throw an error if no authorization header is present", () => {
    const req = {
      get: (headerName) => {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the token cannot be verified", () => {
    const req = {
      get: (headerName) => {
        return xyz;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after decoding the token", () => {
    const req = {
      get: (headerName) => {
        return "xyjlkhklhckjhdkljchlcjhlhclhlckhdhklz";
      },
    };
    jwt.verify = function () {
      return { userId: "xyz" };
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  });
});
