const { Router } = require("express");
const { userModel } = require("../DB");
const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = Router();

// signup endpoint
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = new Types.ObjectId();
    const user = await userModel.create({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      DateOfBirth,
      userID,
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

// signin endpoint
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
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

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(200).json({
        message: "Wrong Credentials",
      });
    }

    if (passwordMatch && existingUser) {
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
    }
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//create Todo endpoint
userRouter.post("/createtodo", async (req, res) => {
  const { title, description, dueDate, status, userID } = req.body;
  if (!title || !description || !dueDate || !status || !userID) {
    return res.status(400).json({
      message: "All Fields Are Mandatory",
    });
  }

  try {
    const findUser = await userModel.findOne({ userID });
    if (!findUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    const todoID = new Types.ObjectId();
    findUser.todos.push({
      title,
      description,
      dueDate,
      status,
      todoID,
    });
    findUser.save();
    return res.status(200).json({
      message: "Todo created Successfully",
    });
  } catch (error) {
    console.log("Error in creating todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all todos endpoint
userRouter.post("/fetchAllTodo", async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    return res.status(400).json({
      message: "Pass the userID",
    });
  }

  try {
    const userFound = await userModel.findOne({ userID });
    if (!userFound) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    console.log("User Found", userFound.todos);
    return res.status(200).json({
      message: "User Todos",
      todos: userFound.todos,
    });
  } catch (error) {
    console.log("Error in fetching todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = {
  userRouter,
};
