const express=require('express');
const router =express.Router();
const auth=require('../middlewares/auth');
const User=require('../helpers/users');
let upload = require('../helpers/uploads');

/*
router.get('/profile/user_id', (req,res)=>{

});

router.put('/userProfile/user_id',(req,res)=>{

})
*/

router.post('/changeProfilePic/:target', auth.isAuth, upload.single('file') ,function(req,res){
    let dir = `./public/uploads/${req.user.user_id}/pic/${req.file.filename}`;
    User.uploadProfilePic(dir, req.user.id)
    .then((data) => {
        res.send(data);   
    })
    .catch((err) => {
        res.send(err);
    })
});


router.put('/changeInfo', auth.isAuth,auth.emailRegistered,auth.usernameRegistered, function(req,res){
    console.log(req.user);
    User.checkUsername(req.body.username)
    .then((data) => {
        if (data){
            User.updateUserInfo(
            req.body.username,
            req.body.name,
            req.body.lastname,
            req.body.email,
            req.user.id
        )
        .then(() => {
                    let user = {user_id:req.user.id,user_username:req.body.username}
                    req.logIn(user, { session: false }, function(err) {
                        if (err) {
                            return res.status(500).send({
                                err: 'Could not log in user'
                            });
                        }
                        res.status(200).send({
                            status: 200,
                            message: 'Login Successful',
                        });
            })}
    )
    .catch(err => res.send(err));
    }
}).catch(err=>res.send(err));
});

module.exports=router;