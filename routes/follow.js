const express=require('express');
const router =express.Router();
const Follow=require('../helpers/follows');

router.post('/follow',(req,res)=>{
    Follow.follow(req.body.user_id,req.user.id)
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err);
        });
});

router.delete('/unfollow',(req,res)=>{
    Follow.unfollow(req.body.user_id,req.user.id)
        .then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err);
        });

});
module.exports=router;