// const multer = require("multer");
const { ProfileModel } = require("../models/profileModel");
const upload = require("../routes/saveToCloud");

require("dotenv").config();
const cloudinary = require("../config/cloudinary");

// // Create a storage object with a given configuration
// const storage = multer.memoryStorage();

// // Set multer storage engine to the newly created object
// const upload = multer({ storage, preservePath: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Choose an appropriate destination directory
//   },
//   filename: (req, file, cb) => {
//     // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     // const userId = req.body.userId;
//     const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, fileName); // Set the filename of the uploaded file

//     // cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage });

const profileUploader = async (req, res) => {
  await cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error uploading profile");
    }
    const filter = { userId: req.body.userId };
    const update = { profileUrl: result.url };

    // Try to find the user and update their profileUrl
    const existUser = await ProfileModel.findOneAndUpdate(filter, update, {
      new: true, // Return the updated document
      upsert: true, // Create a new document if it doesn't exist
    });

    if (!existUser) {
      res.send("User not found");
    } else {
      res.send("Updated");
    }
  });
};
// const profileUploader = async (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(404).json({ error: "Not Found" });
//   }

//   try {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       const userId = req.body.userId;
//       let alreadyExitingUser = await ProfileModel.findOne({ userId });

//       if (alreadyExitingUser) {
//         let payload = {
//           profileName: `${Date.now()}_${userId}`,
//           filePath: file.path,
//           contentType: file.mimetype,
//         };
//         let updatedUserProfile = await ProfileModel.findOneAndUpdate(
//           { userId },
//           payload
//         );
//         res.status(200).json({
//           message: "Updated profile image successfully!",
//           id: alreadyExitingUser._id,
//         });
//       } else {
//         const profileUploader = new ProfileModel({
//           userId: userId,
//           profileName: `${Date.now()}_${userId}`,
//           filePath: file.path,
//           contentType: file.mimetype,
//         });
//         const savedProfile = await profileUploader.save();
//         res.status(201).json({
//           message: "Uploaded",
//           id: savedProfile.id,
//           name: savedProfile.profileName,
//           contentType: savedProfile.contentType,
//         });
//       }
//     } else {
//       res.status(400).json({ message: "Invalid image file type" });
//     }
//   } catch (error) {
//     console.log("Error while uploading image", error);
//     res.status(500).json({ message: "Image upload failed" });
//   }
// };

// const getProfileById = async (req, res) => {
//   try {
//     const profile = await ProfileModel.findById(req.params.id);
//     if (!profile) {
//       return res.status(404).json({ message: "Image not found" });
//     }
//     res.status(200).set("Content-Type", profile.contentType).send(profile.data);
//   } catch (error) {
//     console.error(`Error while getting image of id ${req.params.id}`, error);
//     res.status(500).json({ message: `Error fetching image: ${error.message}` });
//   }
// };

const getProfileById = async (req, res) => {
  try {
    let existUser = await ProfileModel.findOne({ userId: req.params.id });
    if (existUser) {
      res.status(200).send({profileUrl: existUser.profileUrl});
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    console.error(`Error while getting image of userID${req.params.id}`, error);
    res.status(500).json({ message: `Error fetching image: ${error.message}` });
  }
};

module.exports = {
  profileUploader,
  getProfileById,
};
