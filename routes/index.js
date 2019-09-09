const express = require('express');
const router = express.Router();


router.use('/auth',require('./auth'));
router.use('/follow',require('./follow'));
router.use('/post',require('./post'));
router.use('/like',require('./like'));
router.use('/comment',require('./comment'));
router.use('/profile',require('./profile'));
router.use('/search',require('./search'))

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/index');
    }else{
        res.redirect('/login');
    }
});

router.get('/index',(req,res)=>{
    res.send('this is dashboard');
})



module.exports=router;