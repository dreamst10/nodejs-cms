const db = require('../utilities/db');
const bcrypt = require('bcryptjs');
const properties = require('../utilities/properties');

module.exports.checkEmail = email => {
  return new Promise((res, rej) => {
    db.connect().then(obj => {
      obj.oneOrNone(properties.checkEmail, [email]).then(user => {
        res(user);
        obj.done();
      }).catch(err => {
        rej(err);
      })
    }).catch(err => {
      console.log(err);
      rej(err);
    });
  });
};

module.exports.checkUsername = username => {
  return new Promise((res, rej) => {
    db.connect().then(obj => {
      obj.oneOrNone(properties.checkUsername, [username]).then(user => {
        res(user);
        obj.done();
      }).catch(err => {
        rej(err);
      })
    }).catch(err => {
      console.log(err);
      rej(err);
    });
  });
}

module.exports.register = (name, lastname, email, username, password) => {
    return new Promise((res, rej) => {
        db.connect().then(obj=>{
            obj.none(properties.newUser,[name, lastname, email, username, password])
                .then(()=>{
                    res({
                        status:200,
                        message:'ok'
                    });
                    obj.done();
                }).catch((err)=>{
                    rej({
                        status:500,
                        message:'unsuccesful register'
                    })
                    obj.done();
                });
        });
    });
};

module.exports.comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(candidate, hash, (err, isMatch) => {
      if(err) rej(err);
        res(isMatch);
    })
  })
}





/*
module.exports.searchUsers = query => {
  return new Promise((res, rej) => {
    db.connect().then(obj => {
      obj.manyOrNone(properties.getUsersByUsername, ['%' + query + '%']).then(users => {
        res(users);
        obj.done();
      });
    }).catch(err => {
      console.log(err);
      rej(err);
    });
  });
}*/

