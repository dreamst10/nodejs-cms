const express=require('express');
const router =express.Router();
const Posts=require('../helpers/posts');
const auth=require('../middlewares/auth');
let upload = require('../helpers/uploads');

router.post('/createPost',auth.isAuth, (req, res) => {
    Posts.createPost(req.body.title,
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

router.post('/createImagePost/:target', auth.isAuth, upload.single('file'), (req, res) => {
    let dir = `./public/uploads/${req.user.id}/posts/${req.file.filename}`;
    console.log(req.body.type_post);
    Posts.createPost(req.body.title,
            req.body.text,
            dir,
            req.user.id,
            2)
        .then((data) => {
            res.send(data);
            
        })
        .catch((err) => {
            res.send(err);
        })
});


module.exports=router;

