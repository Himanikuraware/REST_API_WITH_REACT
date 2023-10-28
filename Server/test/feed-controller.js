const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const Post = require("../models/post");
const FeedController = require("../controllers/feed");

describe("Feed Controller", () => {
  const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2tfmflc.mongodb.net/test-messages`;

  before(function (done) {
    mongoose.connect(MONGODB_URI).then((result) => {
      const user = new User({
        email: "test@test.com",
        password: "test1",
        name: "Test",
        posts: [],
        _id: "5c0f66b979af55031b34728a",
      });
      return user.save();
    });
  });
  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post",
      },
      file: {
        path: "abc",
      },
      userId: "5c0f66b979af55031b34728a",
    };
    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => done());
  });
});
