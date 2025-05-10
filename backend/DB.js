const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const todoSchema = new Schema({
  title: String,
  description: String,
  dueDate: String,
  status: String,
  todoID: ObjectId,
  tagName: String,
});

const stickyWallSchema = new Schema({
  title: String,
  description: String,
});

const tagNameSchema = new Schema({
  tagName: [String],
});

const userSchema = new Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  DateOfBirth: String,
  userID: ObjectId,
  todos: [todoSchema],
  stickyNotes: [stickyWallSchema],
});

const todoModel = mongoose.model("todos", todoSchema);
const userModel = mongoose.model("users_datas", userSchema);
const tagModel = mongoose.model("tags", tagNameSchema);
module.exports = {
  todoModel,
  userModel,
  tagModel,
};
