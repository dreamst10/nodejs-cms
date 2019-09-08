const express = require('express');
const router = express.Router();


router.use('/',require('./auth'));
router.use('/',require('./follow'));
router.use('/',require('./post'));
router.use('/',require('./like'));


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