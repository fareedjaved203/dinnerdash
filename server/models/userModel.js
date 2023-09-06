const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config({ path: "../config/config.env" });

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [32, "Name cannot be this much long"],
      minLength: [4, "Name should be atleast 4 characters"],
    },
    name: {
      type: String,
      required: [true, "Please Enter Your Display Name"],
      maxLength: [32, "Display Name cannot be this much long"],
      minLength: [2, "Display Name should be Atleast 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter A Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Passwword must be atleast 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "18000s",
  });
};

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//password reset token
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
