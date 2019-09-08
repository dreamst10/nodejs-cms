const express = require('express');
let router = express.Router();
const post = require('../helpers/posts');
const auth = require('../middlewares/auth');

router.post('/setLike', auth.isAuth, (req, res) => {
    post.newLike(req.body.postId,
        req.user.id,
        req.body.typeLike)//1 Like, 2 dislike
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports=router;
