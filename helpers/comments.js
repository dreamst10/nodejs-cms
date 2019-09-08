const db = require('../utilities/db');
const props = require('../utilities/properties.js');

module.exports.createComment = (comment_text, user_id, post_id) => {
  return handler(props.newComment, [comment_text, 'ignore this', user_id, post_id],false, db.none);
}

module.exports.deleteComment = (comment_id,user_id) => {
  return handler(props.deleteComment, [comment_id,user_id], false, db.none);
}

module.exports.getComments = (post_id) => {
  return handler(props.getComments, [post_id], true, db.any);
}

module.exports.updateComment = (comment_text, comment_id, user_id) => {
  return handler(props.updateComment, [comment_text, comment_id, user_id], false, db.none);
}

module.exports.checkPost = (post_id) => {
  return handler(props.checkPost, [post_id], true, db.one);
}


const handler = async (query, params, data, callback) => {
  try {
    const response = await callback(query, params);
    return data ? response : true;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}