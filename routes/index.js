const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('./../views/index.pug',{title:'test title', message:'test message'});
});

//user is already logged in
router.get('/index',(req,res)=>{

});


module.exports=router;