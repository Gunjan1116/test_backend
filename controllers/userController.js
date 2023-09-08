const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserData = require("../models/userModel");

const submitForm = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profession,
      city,
      gender,
      smoke,
      diet,
      drink,
      createFor,
      month,
      day,
      year,
      maritalStatus,
      height,
      country,
      religion,
      motherTongue,
      mobile,
      address,
    } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Age filter
    function calculateAge(birthDate) {
      const today = new Date();
      const yearsDiff = today.getFullYear() - birthDate.getFullYear();

      // Check if the birthday has occurred this year already
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        return yearsDiff - 1;
      }
      return yearsDiff;
    }

    const birthDate = new Date(year, month, day);
    const userAge = calculateAge(birthDate);

    const userData = new UserData({
      name,
      email,
      password: hashedPassword,
      profession,
      city,
      gender,
      smoke,
      diet,
      drink,
      createFor,
      month,
      day,
      year,
      maritalStatus,
      height,
      country,
      religion,
      motherTongue,
      mobile,
      address,
      age: userAge,
    });

    await userData.save();
    res.json({ status: true });
  } catch (err) {
    console.log("Submit form", err);
    res.json({ status: false });
  }
};

const getRegistrationForm = async (req, res) => {
  try {
    const data = await UserData.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
};

// Get user data by ID

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserData.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

// Update single user

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    // Find the user by ID and update their data
    const updatedUser = await UserData.findByIdAndUpdate(
      userId,
      updatedUserData,
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};

//Filter data
const User = require("../models/userModel");

const applyFilter = async (req, res) => {
  try {
    const { gender, maritalStatus, age, height, diet, smoke, drink } = req.body;

    const [minHeight, maxHeight] = height
      ? height.split(" - ").map(Number)
      : "";

    const [minAge, maxAge] = age ? age.split(" - ").map(Number) : "";

    const filter = {};

    if (gender) filter.gender = gender;
    if (maritalStatus) filter.maritalStatus = maritalStatus;

    if (height) {
      if (minHeight !== undefined && maxHeight !== undefined) {
        filter.height = { $gte: minHeight, $lte: maxHeight };
      }
    }

    if (age) {
      if (minAge !== undefined && maxAge !== undefined) {
        filter.age = { $gte: minAge, $lte: maxAge };
      }
    }

    if (diet) filter.diet = diet;

    if (smoke) filter.smoke = smoke;
    if (smoke === "No Matter") {
      delete filter["smoke"];
    }

    if (drink) filter.drink = drink;
    if (drink === "No Matter") {
      delete filter["drink"];
    }

    // console.log(filter);

    const data = await User.find(filter);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to filter" });
  }
};

const loginUserRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      "ash_it",
      {
        expiresIn: "1h", // Set token expiration as per your requirement
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  submitForm,
  getRegistrationForm,
  getCurrentUser,
  loginUserRegistration,
  updateUser,
  applyFilter,
};
