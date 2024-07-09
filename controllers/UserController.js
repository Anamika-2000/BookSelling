const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, ...otherDetails } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "Email id already registered.", alert: false });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match.", alert: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ ...otherDetails, email, password: hashedPassword, confirmPassword: hashedPassword });
    res.status(201).send({ message: "Successfully signed up", alert: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Email not found, please sign up first", alert: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect password", alert: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
    };

    res.send({
      message: "Login Successful",
      alert: true,
      data: userData,
      token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword, confirmPassword: hashedPassword }, { new: true });
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }
    res.send({ message: "Password reset successfully", alert: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).select('-password -confirmPassword');
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }
    res.send({ message: "User profile fetched successfully", alert: true, data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -confirmPassword');
    res.send({ message: "Users fetched successfully", alert: true, data: users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedData = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
      updatedData.confirmPassword = updatedData.password;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password -confirmPassword');
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }
    res.send({ message: "User profile updated successfully", alert: true, data: user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }
    res.send({ message: "User profile deleted successfully", alert: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userSignUp,
  userLogin,
  resetPassword,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
};
