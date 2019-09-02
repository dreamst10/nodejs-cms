const express = require('express');
const router = express.Router();


router.use('/',require('./auth'));


/*router.get('/', (req, res) => {
//    res.render('index',{title:'test title', message:'test message lol'});
    res.status(200).send({
        status:200,
        message:'ok'
    })
//    res.redirect('/index');
});

//user is already logged in
router.get('/index',(req,res)=>{
    res.render('index');
});*/


module.exports=router;