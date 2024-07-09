const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	confirmPassword: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const User = model("User", UserSchema);

module.exports = User;
