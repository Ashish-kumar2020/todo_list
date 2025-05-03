const express = require("express");
const app = express();
require("dotenv").config();
const PORT_NUMBER = process.env.PORT_NUMBER;
const { userRouter } = require("./routes/userRouter");
const { mongoose } = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow this specific origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use("/api/v1/user", userRouter);
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_AUTH_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
    app.listen(PORT_NUMBER, () => {
      console.log(
        `Connected to Mongo DB and Server is up and running on PORT_NUMBER : ${process.env.PORT_NUMBER}`
      );
    });
  } catch (error) {
    console.log("Error Connecting to DB : ", error);
  }
}

main();
