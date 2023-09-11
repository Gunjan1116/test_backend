const multer = require("multer");
const { ProfileModel } = require("../models/profileModel");
const path = require('path');

require("dotenv").config();

// // Create a storage object with a given configuration
const storage = multer.memoryStorage();

// // Set multer storage engine to the newly created object
const upload = multer({ storage, preservePath: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     //cb(null, "./uploads"); 
//     // Choose an appropriate destination directory
//     const uploadPath = path.join(__dirname, 'uploads');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     // const userId = req.body.userId;
//     const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, fileName); // Set the filename of the uploaded file

//     // cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

//const upload = multer({ storage });

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
          profileName: `${Date.now()}_${userId}`,
          filePath: file.path,
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
          profileName: `${Date.now()}_${userId}`,
          filePath: file.path,
          contentType: file.mimetype,
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

// const getProfileById = async (req, res) => {
//   try {
//     const profile = await ProfileModel.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     const fs = require("fs");
//     fs.readFile(profile.filePath, (err, data) => {
//       if (err) {
//         console.error(`Error while reading file: ${err}`);
//         return res.status(500).json({ message: `Error fetching image` });
//       }
//       res.set("Content-Type", profile.contentType);
//       res.send(data);
//     });
//   } catch (error) {
//     console.error(`Error while getting image of id ${req.params.id}`, error);
//     res.status(500).json({ message: `Error fetching image: ${error.message}` });
//   }
// };

module.exports = {
  profileUploader,
  upload,
  getProfileById,
};
