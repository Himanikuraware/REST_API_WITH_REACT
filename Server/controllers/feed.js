const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: Math.random().toString(),
        title: "The First post",
        content: "This is the first post",
        creator: {
          name: "Himani",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      // 422 status code :- Validation failed
      message: "Validation failed, Please enter correct data",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpaperplanedesign.in%2Fproducts%2Fethnic-designer-beige-white-vintage-wallpaper&psig=AOvVaw3Ik4_KEGDwDMW3sfUhCR8G&ust=1697456016191000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCNDV3Mr694EDFQAAAAAdAAAAABAD',
    creator: { name: "Himani" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully",
        post: result,
      });
    })
    .catch((err) => console.log(err));
};
