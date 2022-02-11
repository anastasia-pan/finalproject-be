const router = require("express").Router();

//needed to verify and log in
const passport = require("passport");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const session = { session: false };

//import model schema
const { User } = require("../models/user");
const { UserFavourites } = require("../models/userFavourites");
const { Totem } = require("../models/userFavourites");

//===================================== verify user ======================================//

const profile = (req, res, next) => {
  res.status(200).json({
    message: "profile",
    user: req.user,
    token: req.query.secret_token,
  });
};

router.get("/", passport.authenticate("jwt", session), profile);

//===================================== register user ======================================//

//takes the authenticated req, checks for user and returns a response
const register = async (req, res, next) => {
  try {
    req.user.name
      ? res.status(201).json({ msg: "user registered", user: req.user })
      : res.status(401).json({ msg: "User already exists" });
  } catch (error) {}
};

//===================================== create a user ======================================//
//http://localhost/user/createuser
//register router - authenticate using registerStrategy (name, 'register) and
//passes on the register function define above
router.post(
  "/registeruser",
  passport.authenticate("register", session),
  register
);

//================================================= user login =====================================================//
const login = async (req, res, next) => {
  passport.authenticate("login", (error, user) => {
    try {
      if (error) {
        res.status(500).json({ message: "Internal Server Error" });
      } else if (!user) {
        res.status(401).json({ msg: `User ${user} does not exist` });
      } else {
        const loginFn = (error) => {
          if (error) {
            return next(error);
          } else {
            const userData = { id: user.id, name: user.name };
            const data = {
              user,
              token: jwt.sign({ user: userData }, process.env.SECRET_KEY),
            };
            res.status(200).json(data);
          }
        };
        //req comes from express, login comes from passport, adding constructors using prototype methodology
        //options and callback
        req.login(user, session, loginFn);
      }
    } catch (error) {
      return next(error);
    }
  })(req, res, next); //IFFY Immediately invoked function expression
};

router.post("/login", login);

//========================get all users===========================//

router.get("/getall", async (req, res) => {
  const user = await User.findAll({});
  res.status(200).json(user);
});

//========================get all favourites===========================//

router.get("/favourites/:id", async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  const favourites = await UserFavourites.findAll({
    where: { userID: req.params.id },
  });
  const totemslist = [];
  for (i in favourites) {
    totemslist.push(
      await Totem.findOne({
        where: { id: i.TotemId },
      })
    );
  }

  res.status(200).json(totemslist);
});

// =============================== delete one user ==================================================
router.delete("/:id", async (req, res) => {
  // const user = await User.destroy({ where: { id: req.params.id } });
  const user = await User.destroy({ where: { id: req.params.id } });

  res
    .status(200)
    .json({ msg: `${req.params.id} has been deleted from the database` });
});

//===================================== fetch one user ======================================//
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  res.status(200).json({ msg: user });
});

//===================================== update user ======================================//
//body sends entire object which replaces original user
router.put("/updatedetails/:id", async (req, res) => {
  const updatedUser = await User.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json({ msg: updatedUser });
});

router.put("/:id", async (req, res) => {
  const updatedUser = await User.update(
    { name: req.body.name },
    {
      where: { id: req.params.id },
    }
  );
  res.status(200).json(`${req.params.id} updated`);
});

//===================================== fetch all totems created by user ======================================//

router.get("/totem/:id", async (req, res) => {
  const totemsreturned = await Totem.findAll({
    where: { createdBy: req.params.id },
  });
  res.status(200).json(totemsreturned);
});

module.exports = router;
