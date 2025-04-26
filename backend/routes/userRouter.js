const { Router } = require("express");
const { userModel } = require("../DB");
const { Types } = require("mongoose");
const userRouter = Router();

// create a user [signup]

userRouter.post("/signup", async (req, res) => {
  // Extract all the fields from body
  const { userName, password, firstName, lastName, email, DateOfBirth } =
    req.body;

  // Check if any of the parameter is null or not
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
    // Check if user already exists in DB
    const checkUserExists = await userModel.findOne({ email });
    if (checkUserExists) {
      return res.status(200).json({
        message: "Email ID Already Registred",
      });
    }

    // Create userID
    const userID = new Types.ObjectId();
    // create new User
    const user = await userModel.create({
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      DateOfBirth: DateOfBirth,
      userID: userID,
    });

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

// singin
module.exports = {
  userRouter: userRouter,
};
