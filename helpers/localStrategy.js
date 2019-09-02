let User = require('./users');
let localStrategy = require('passport-local').Strategy;

module.exports = new localStrategy( {usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
  User.checkUsername(username).then(user => {
    if (user === null) {
      return done(null, false);
    }

    User.comparePassword(password, user.user_password).then(isMatch => {
      if(isMatch) {
        return done(null, {
          id: user.user_id,
          username: user.user_username,
          name: user.user_name,
          typeId: user.type_id,
          creationTime: new Date(user.user_creation_time).getTime(),
          email: user.user_email
        });
      }
      else {
        return done(null, false)
     }
    })
  }, err => {
    return done(null, false);
  });
});