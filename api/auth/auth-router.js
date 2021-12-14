const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const Users = require("../users/users-model");
const jwtDecode = require('jwt-decode');

router.post("/register", validateRoleName, async (req, res) => {
  res.status(200).send("register");
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
});


router.post("/login", checkUsernameExists, async (req, res) => {
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
  Users.login(req.body)
    .then(user => {
      if (!user) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        console.log(jwtDecode(user.token))
        res.status(200).send({ ...user, message: `${user.username} is back!` });
      }
    })
    .catch(err => {
      res.status(500).json({ ...err, message: "Error logging in" });
    });
});

module.exports = router;
