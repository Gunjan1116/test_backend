const express = require("express");
const router = express.Router();

const {
  profileUploader,
  upload,
  getProfileById,
} = require("../controllers/profileController");
// const { authenticate } = require("../middlewares/authenticationMiddleware");

router.post("/profile-upload", upload.single("profile"), profileUploader);
router.get("/:id", getProfileById);

module.exports = router;
