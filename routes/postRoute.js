const express = require("express");
const multer = require("multer");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/get-posts", postController.getAllPosts);

const upload = multer({ dest: "uploads/" });

router.post("/create-post", upload.single("image"), postController.createPost);

module.exports = router;
