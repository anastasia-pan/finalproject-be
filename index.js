require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");

const connection = require("./connection");

const userRouter = require("./routes/user");
const landingRouter = require("./routes/landing");

const { User } = require("./models/user");

const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");

const app = express();

app.use(express.json());

app.use(cors());

//route to user and landing
app.use("/user", userRouter);
app.use("/", landingRouter);

//require string and registersstrategy
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.listen(process.env.PORT, () => {
  connection.authenticate();
  User.sync({ alter: true });
  console.log("App is online");
});
