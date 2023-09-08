const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/save-comments", commentController.saveComment);

router.get("/get-comments/:postId", commentController.getComments);

module.exports = router;
