const express = require('express');
let router = express.Router();
const search = require('../helpers/search');
const follows = require('../helpers/follows');
const auth = require('../middlewares/auth');

router.get('/:values', auth.isAuth, (req, res) => {
    let a = String(req.params.values);
    if (a.startsWith('@')) {
        value = a.replace("@", "%") + "%";
        
    } else {
        value = `%${a}%`;
    }
        search.searchUser(value).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        });
    
});

module.exports = router;