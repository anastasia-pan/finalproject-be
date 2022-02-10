require("dotenv").config();
require 

const express = require("express");
const passport = require("passport");
const cors = require("cors");

const connection = require("./connection");

const userRouter = require("./routes/user");
const testRouter = require("./routes/test");
const adminRouter = require("./routes/admin");
const totemRouter = require("./routes/totem");
const favouritesRouter = require("./routes/userFavourites");

const { User } = require("./models/user");
const { Totem } = require("./models/totem");
const { Location } = require("./models/location");
const { UserFavourites } = require("./models/userFavourites");

const {
  registerStrategy,
  loginStrategy,
  verifyStrategy,
} = require("./middleware/auth");
// const { FORCE } = require("sequelize/dist/lib/index-hints");

const app = express();

app.use(express.json());

app.use(cors());

//route to user and landing
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/totem", totemRouter);
app.use("/test", testRouter);
app.use("/favourites", favouritesRouter);

//require string and registersstrategy
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.listen(process.env.PORT, async () => {
  await connection.authenticate();
  await User.sync({ alter: true });
  await Totem.sync({ alter: true });
  await Location.sync({ alter: true });
  await UserFavourites.sync({ alter:true });
  console.log("App is online");
});
