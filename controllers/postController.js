const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let image = "";

    if (req.file) {
      image = req.file.path;
    }

    const newPost = new Post({
      author: req.body.authorId,
      content,
      image,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email profile');
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
