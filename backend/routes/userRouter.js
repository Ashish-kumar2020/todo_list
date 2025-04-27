const { Router } = require("express");
const { userModel } = require("../DB");
const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");

const userRouter = Router();

// create a user [signup]
userRouter.post("/signup", async (req, res) => {
  const { userName, password, firstName, lastName, email, DateOfBirth } =
    req.body;

  if (
    !userName ||
    !password ||
    !firstName ||
    !lastName ||
    !email ||
    !DateOfBirth
  ) {
    return res.status(400).json({
      message: "All Fields are mandatory",
    });
  }
  try {
    const checkUserExists = await userModel.findOne({ email: email });
    if (checkUserExists) {
      return res.status(200).json({
        message: "Email ID Already Registered",
      });
    }

    const userID = new Types.ObjectId();
    const user = await userModel.create({
      userName,
      password,
      firstName,
      lastName,
      email,
      DateOfBirth,
      userID,
    });
    console.log(user);
    return res.status(200).json({
      message: "User Created Successfully",
      user: user,
    });
  } catch (error) {
    console.log("Error during signup", error);
    if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// signin
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All Fields are mandatory",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({
        message: "Email Does not exist. Please signup",
      });
    }

    if (existingUser.password !== password) {
      return res.status(200).json({
        message: "Wrong Credentials",
      });
    }

    const token = jwt.sign(
      { user: existingUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Logged in Successfully",
      existingUser,
      token,
    });
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = {
  userRouter,
};
