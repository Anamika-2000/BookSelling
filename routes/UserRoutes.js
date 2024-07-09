const express = require("express");
const router = express.Router();
const { userSignUp, userLogin, getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, resetPassword } = require("../controllers/UserController");
const { authenticateToken } = require("../middlewares/auth");

router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.post("/resetPassword",authenticateToken, resetPassword);
router.get("/getUserProfile",authenticateToken,getUserProfile)
router.get("/getAllUsers",authenticateToken, getAllUsers);
router.post("/updateUserProfile",authenticateToken,updateUserProfile)
router.post("/deleteUserProfile",authenticateToken,deleteUserProfile)


module.exports = router;
