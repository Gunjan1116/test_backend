const Comment = require("../models/commentModel");

const saveComment = async (req, res) => {
  const { postId, author, text, parentComment } = req.body;
  console.log("Parent Comment ID:", parentComment); 

  try {
    const newComment = new Comment({
      postId,
      author,
      text,
      parentComment, // Assign parent comment ID
    });

    await newComment.save();

    // If a parent comment is specified, update the parent comment's replies
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (parent) {
        console.log("Parent Comment Found:", parent);
        parent.replies.push(newComment._id);
        await parent.save();
        console.log("Parent Comment Updated:", parent);
      }
    }

    res.json({ message: "Comment saved successfully" });
  } catch (error) {
    console.log("Error saving comment:", error);
    res.status(500).json({ error: "Error saving comment" });
  }
};

const getComments = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};

module.exports = {
  saveComment,
  getComments,
};
