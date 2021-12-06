const router = require("express").Router();
const Users = require("./users-model.js");
const { restricted, only } = require("../auth/auth-middleware.js");

router.get("/", restricted, async (req, res) => {
  Users.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({ err, message: "Failed to get users" });
    });
});

/**
  [GET] /api/users/:user_id

  This endpoint is RESTRICTED: only authenticated users with role 'admin'
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    }
  ]
 */
router.get("/:user_id", restricted, only('admin'), async (req, res) => { // done for you
  console.log(`GET /api/users/${req.params.user_id}`);
  Users.findById(req.params.user_id)
    .then(user => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).send({ error, message: "Failed to get user" });
    });
});

module.exports = router;
