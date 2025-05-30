const { Router } = require("express");
const { userModel, tagModel } = require("../DB");
const { Types } = require("mongoose");
const mongoose = require("mongoose");
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
    const hashedPassword = await bcrypt.hash(password, 5);
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
      status: 200,
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
      return res.status(400).json({
        message: "Email Does not exist. Please signup",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
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
        status: 200,
      });
    }
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Update profile endpoint
userRouter.put("/updateProfile", async (req, res) => {
  const {
    userName,
    password,
    firstName,
    lastName,
    DateOfBirth,
    email,
    userID,
  } = req.body;

  if (!userID) {
    return res.status(400).json({
      message: "All Fields are mandatory",
    });
  }
  try {
    const userFound = await userModel.findOne({ userID });
    if (!userFound) {
      return res.status(400).json({
        message: "No User Found",
      });
    }
    if (userName) userFound.userName = userName;
    if (password) userFound.password = password;
    if (firstName) userFound.firstName = firstName;
    if (lastName) userFound.lastName = lastName;
    if (email) userFound.email = email;
    if (DateOfBirth) userFound.DateOfBirth = DateOfBirth;
    await userFound.save();
    return res.status(200).json({
      message: "UserDetails Updated Successfully",
    });
  } catch (error) {
    console.log("Error in Editing todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//create Todo endpoint
userRouter.post("/createtodo", async (req, res) => {
  const { title, description, dueDate, status, userID, tagName } = req.body;
  console.log(title, description, dueDate, status, userID, tagName);
  if (!title || !description || !dueDate || !status || !userID || !tagName) {
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
      tagName,
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

// Create tagNames
userRouter.post("/createTagName", async (req, res) => {
  const { tagName } = req.body;
  if (!tagName) {
    return res.status(400).json({
      message: "All fields are mandatory",
    });
  }

  try {
    const tagNameID = "681dfbc0ea82e58f3addddbb";
    const searchTagNameID = await tagModel.findById(tagNameID);
    if (!searchTagNameID) {
      return res.status(400).json({
        message: "Tag Document ID not found",
      });
    }
    searchTagNameID.tagName.push(tagName);
    await searchTagNameID.save();
    return res.status(200).json({
      message: "Tag name update successfully",
      searchTagNameID,
    });
  } catch (error) {
    console.log("Error in Creatig TagName", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all tagNames
userRouter.get("/fetchAllTagName", async (req, res) => {
  try {
    const tagId = "681dfbc0ea82e58f3addddbb";
    const searchTagID = await tagModel.findById(tagId);
    if (!searchTagID) {
      return res.status(400).json({
        message: "Tag ID not found",
      });
    }
    return res.status(200).json({
      message: "Tag Names Fetched Successfully",
      searchTagID,
    });
  } catch (error) {
    console.log("Error in fetching tagName", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all Backlog todos endpoint
userRouter.post("/fetchbacklogTodo", async (req, res) => {
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
    const backlogTasks = userFound.todos.filter(
      (task) => task.status === "Backlog"
    );

    return res.status(200).json({
      message: "User Todos",
      todos: backlogTasks,
    });
  } catch (error) {
    console.log("Error in fetching todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all Inprogress Task
userRouter.post("/fetchinprogressTodo", async (req, res) => {
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
    const inprogressTasks = userFound.todos.filter(
      (task) => task.status === "Inprogress"
    );

    return res.status(200).json({
      message: "User Todos",
      todos: inprogressTasks,
    });
  } catch (error) {
    console.log("Error in fetching todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all Done Task
userRouter.post("/fetchdoneTodo", async (req, res) => {
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
    const doneTasks = userFound.todos.filter((task) => task.status === "Done");

    return res.status(200).json({
      message: "User Todos",
      todos: doneTasks,
    });
  } catch (error) {
    console.log("Error in fetching todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all todos
userRouter.post("/fetchalltodos", async (req, res) => {
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

// Edit Todo endpoint
userRouter.put("/editTodo", async (req, res) => {
  const { userID, todoID, title, description, status, dueDate } = req.body;
  if (!userID || !todoID) {
    return res.status(400).json({
      message: "All Fields are mandatory",
    });
  }

  try {
    const userFound = await userModel.findOne({ userID });
    if (!userFound) {
      return res.status(400).json({
        message: "No User Found",
      });
    }
    // Find for specific todo
    const todoToFind = new mongoose.Types.ObjectId(todoID);
    const searchTodo = userFound.todos.find((t) => t.todoID.equals(todoToFind));

    if (!searchTodo) {
      return res.status(400).json({
        message: "No Todo Found",
      });
    }
    if (title) searchTodo.title = title;
    if (description) searchTodo.description = description;
    if (status) searchTodo.status = status;
    if (dueDate) searchTodo.dueDate = dueDate;
    await userFound.save();
    return res.status(200).json({
      message: "Todo Updated Successfully",
    });
  } catch (error) {
    console.log("Error in Editing todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete todo endpoint
userRouter.delete("/deleteTodo", async (req, res) => {
  const { userID, todoID } = req.body;
  if (!userID || !todoID) {
    return res.status(400).message({
      message: "All Fields are mandatory",
    });
  }

  try {
    const userFound = await userModel.findOne({ userID });
    if (!userFound) {
      return res.status(400).json({
        message: "No User Found",
      });
    }
    const todoToDelete = new mongoose.Types.ObjectId(todoID);
    const findTodo = userFound.todos.findIndex((t) =>
      t.todoID.equals(todoToDelete)
    );
    if (findTodo === -1) {
      return res.status(400).json({
        message: "Todo not found",
      });
    }
    userFound.todos.splice(findTodo, 1);
    await userFound.save();
    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.log("Error in Editing todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Stickywall endpoint
userRouter.post("/stickywall", async (req, res) => {
  const { title, description, userID } = req.body;
  console.log(title, description, userID);
  if (!title || !description || !userID) {
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
    findUser.stickyNotes.push({
      title,
      description,
      todoID,
    });
    findUser.save();
    return res.status(200).json({
      message: "Sticky Note created Successfully",
    });
  } catch (error) {
    console.log("Error in creating todo", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/fetchallstickynotes", async (req, res) => {
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

    return res.status(200).json({
      message: "User Todos",
      todos: userFound.stickyNotes,
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
