const express=require('express');
const router =express.Router();
const Posts=require('../helpers/posts');
const auth=require('../middlewares/auth');

router.post('/createPost',auth.isAuth, (req, res) => {
    Posts.createPost(req.user.username,
            req.body.text,
            'nothing',
            req.user.id,
            1)
        .then((data) => {
            res.send(data);
            
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('getUserPosts',auth.isAuth,(req,res)=>{

})

router.delete('/deletePost',auth.isAuth, (req, res) => {
    console.log(req.body)
    Posts.deletePost(req.body.post_id,
            req.user.id)
        .then((data) => {
            res.send(data);
            console.log(data);
        })
        .catch((err) => {
            res.send(err);
        })
});


module.exports=router;