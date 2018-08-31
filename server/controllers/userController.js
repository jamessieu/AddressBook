const User = require('./../schemas/userModel');

const userController = {};

userController.createUser = (req, res, next) => {
  const user = req.body.username;
  const pass = req.body.password;

  if(user && pass) {
    User.create({ username: user, password: pass }, (err, user) => {
      res.locals._id = user._id;
      next();
    })
  }
}

module.exports = userController;