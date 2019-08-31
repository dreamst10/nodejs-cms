const properties = require('../utilities/properties');
const User = require('../helpers/users');

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else{
    res.send({
      status: 403,
      response: 'Not logged in.'
    });
  }
};

module.exports.isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
    res.send({
      status: 403,
      response: 'Already logged in.'
    });
  } else {
    next();
  }
};

//Verifies that the sent email is not registered in db
module.exports.emailRegistered = (req, res, next) => {
  const email = req.body.email;
  User.checkEmail(email).then(data => {
    if(data=== null)
      next();
    else {
      res.status(403).send({
        status: 403,
        message: 'Email already registered'
      });
    }
  }).catch(err => {
    res.status(500).send({
      status: 500,
      message: err
    });
  });
};

module.exports.usernameRegistered = (req, res, next) => {
  const username = req.body.username;
  
  User.checkUsername(username).then(data => {
    if(data === null) {
      next();
    } else {
      res.status(403).send({
        status: 403,
        message: 'Username already in use'
      })
      .catch(err => {
        res.status(500).send({
          status: 500,
          message: err
        });
      });
    }
  });
}