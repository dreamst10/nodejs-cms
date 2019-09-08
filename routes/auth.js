const express=require('express');
const router =express.Router();
const bcrypt=require('bcryptjs');
const User=require('../helpers/users');
const auth=require('../middlewares/auth');
const passport=require('passport');

router.get('/register', (req,res)=>{
//    res.render('register');
});



router.post('/login',auth.isLogged,passport.authenticate('local'), function(req, res) {
   
      
      
          res.status(200).send({
              status: 200,
              message: 'Login Successful',
              user: req.user
          });
      
});
router.post('/register',auth.isLogged,auth.emailRegistered,auth.usernameRegistered,(req,res)=>{
    const user = req.body;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    User.register(user.name,user.lastname,user.email,user.username,user.password)
        .then(data=>{

            res.send(data);
        })
        .catch(err=>{
            res.send(err);
        });
    //res.redirect('login');
});


router.get('/login',(req,res)=>{
    res.send('this is login');
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.status(200).send({ status: 200, message: "Logged out successfully" });
  });


module.exports=router;