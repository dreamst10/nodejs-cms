const express=require('express');
const router =express.Router();
const props=require('../utilities/properties');
const db = require('../utilities/db');
const bcrypt=require('bcryptjs');
const User=require('../helpers/users');
const auth=require('../middlewares/auth')

router.get('/register', (req,res)=>{
//    res.render('register');
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
    //xres.redirect('login');
});

module.exports=router;