const ErrorHandler = require("../utils/errorHandler");

const User = require("../models/userModel");

const sendToken = require("../utils/jwtToken");

const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

const cloudinary = require("cloudinary");

const renderEmailTemplate = require("../utils/emailTemplate");

//register

const registerUser = async (req, res, next) => {
  try {
    let image = "";
    if (req.body.avatar) {
      image = req.body.avatar;
    } else {
      image = "../../client/src/images/defaultUser.jpg";
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { fullName, name, email, password } = req.body;
    const emailAlreadyPresent = await User.findOne({ email });
    if (emailAlreadyPresent) {
      return next(new ErrorHandler("Email Already Exists", 409));
    }
    const user = await User.create({
      fullName,
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email and Password"));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};

//logout
const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//for oneself
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

//get all users (for admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//get a single user (for admin)
const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User Doesn't Exist with Id: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
};

//update user role (for admin)
const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    console.log(user);

    if (!user) {
      return next(new ErrorHandler("User Does not Exist with this id ", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err.message);
    return next(new ErrorHandler(err.message, 500));
  }
};

//delete user (for admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User Does not Exist with this id ", 404));
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.RESET_TOKEN_URL}/${resetToken}`;

    const emailData = {
      resetPasswordUrl: resetPasswordUrl,
    };

    const path = require("path");
    const templatePath = path.join(
      __dirname,
      "..",
      "public",
      "views",
      "templates",
      "resetPasswordTemplate.html"
    );
    const emailContent = renderEmailTemplate(templatePath, emailData);

    try {
      await sendEmail({
        email: user.email,
        subject: "Dinner Dash Password Recovery",
        html: emailContent,
      });

      res.status(200).json({
        success: true,
        message: `Email Sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 404));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Token expired or invalid", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password Does not Match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      fullName: req.body.fullName,
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    } else if (req.body.newPassword === req.body.oldPassword) {
      return next(new ErrorHandler("New Password Can't be Old Password", 409));
    } else if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
};
