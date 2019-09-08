const express = require('express');
let router = express.Router();
const Comments = require('../helpers/comments');
const auth = require('./../middlewares/auth');


const handleCreate = async (req, res, next) => {
  const {comment_text, post_id} = req.body;
  try {
    await Comments.createComment(comment_text, req.user.id, post_id);
    res.status(201).json({status: 201, message: 'Comment created'});
  } catch (err) {
    res.status(500).json({status: 500, err});
  }
}

const handleRead = async (req, res, next) => {
  const {post_id} = req.body;
  try {
    const data = await Comments.getComments(post_id);
    const owner = await Comments.checkPost(post_id);
    let _data = [];
    if (owner.user_id === req.user.id) {
      _data = data.map(item => ({...item, user_id: true}));
    } else {
      _data = data.map(item => {
        return item.user_id === req.user.id ? {...item, user_id:true} : {...item, user_id:false};
      }); 
    }
    res.status(200).json({status: 200, data: _data, message: 'Data fetched'});
  } catch (err) {
    res.status(404).json({status: 404, err})
  }
}

const handleUpdate = async (req, res, next) => {
  const {comment_text, comment_id} = req.body;
  try {
    await Comments.updateComment(comment_text, comment_id, req.user.id);
    res.status(200).json({status:200, message: 'Comment updated'});
  } catch (err) {
    res.status(404).json({status: 404, err});
  }
}

const handleDelete = async (req, res, next) => {
  const {comment_id} = req.body;
  try {
    await Comments.deleteComment(comment_id,req.user.id);
    res.status(200).json({status: 200, message: 'Comment deleted'});
  } catch (err) {
    res.status(404).json({status: 404, err});
  }
}

router.get('/comment',auth.isAuth,handleRead);

router.post('/comment',auth.isAuth, handleCreate);

router.put('/comment',auth.isAuth,handleUpdate);

router.delete('/comment',auth.isAuth,handleDelete);

module.exports = router;
