const multer = require("multer");
const { ProfileModel } = require("../models/profileModel");

require("dotenv").config();

// Create a storage object with a given configuration
const storage = multer.memoryStorage();

// Set multer storage engine to the newly created object
const upload = multer({ storage, preservePath: true });

const profileUploader = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(404).json({ error: "Not Found" });
  }

  try {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      const userId = req.body.userId;
      let alreadyExitingUser = await ProfileModel.findOne({ userId });

      if (alreadyExitingUser) {
        let payload = {
          profileName: `${Date.now()}_${userId}_${file.originalname}`,
          data: file.buffer,
          contentType: file.mimetype,
        };
        let updatedUserProfile = await ProfileModel.findOneAndUpdate(
          { userId },
          payload
        );
        res.status(200).json({
          message: "Updated profile image successfully!",
          id: alreadyExitingUser._id,
        });
      } else {
        const profileUploader = new ProfileModel({
          userId: userId,
          profileName: `${Date.now()}_${userId}_${file.originalname}`,
          data: file.buffer,
          contentType: file ? file.mimetype : null,
        });
        const savedProfile = await profileUploader.save();
        res.status(201).json({
          message: "Uploaded",
          id: savedProfile.id,
          name: savedProfile.profileName,
          contentType: savedProfile.contentType,
        });
      }
    } else {
      res.status(400).json({ message: "Invalid image file type" });
    }
  } catch (error) {
    console.log("Error while uploading image", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).set("Content-Type", profile.contentType).send(profile.data);
  } catch (error) {
    console.error(`Error while getting image of id ${req.params.id}`, error);
    res.status(500).json({ message: `Error fetching image: ${error.message}` });
  }
};

module.exports = {
  profileUploader,
  upload,
  getProfileById,
};
