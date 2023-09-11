const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileName: String,
    filePath: String,
    contentType: String,
  },
  {
    timestamps: true,
  }
);

const ProfileModel = mongoose.model("profile", profileSchema);

module.exports = {
  ProfileModel,
};
