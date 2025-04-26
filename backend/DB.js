const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const todoSchema = new Schema({
  title: String,
  description: String,
  dueDate: String,
  status: String,
  todoID: ObjectId,
});

const userSchema = new Schema({
  userName: String,
  password: String,
  emailId: { type: String, unique: true },
  DateOfBirth: String,
  userID: ObjectId,
  todos: [todoSchema],
});

const todoModel = mongoose.model("todos", todoSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
  todoModel,
  userModel,
};
