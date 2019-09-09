module.exports={
    serverPort:3000,
    dbUrl:'postgres://postgres:himitsu64878@localhost:5432/nodejs-cms',

    //database queries will go here

    newUser:"INSERT INTO users (user_name,user_lastname,user_email,user_username,user_password,user_picture) VALUES ($1,$2,$3,$4,$5,'./public/avatar.jpg')",
    getUser:"SELECT * FROM users WHERE user_username=$1",
    updateInfo:"UPDATE users SET user_username=$1, user_name=$2,user_lastname=$3,user_email=$4 WHERE user_id=$5",
    changePassword:"UPDATE users SET user_password=$1 WHERE user_id=$2",
    updatePicture:"UPDATE users SET user_picture=$1 WHERE user_id=$2",
    searchUser:"SELECT * FROM users WHERE user_username LIKE $1",
    checkEmail:"SELECT * FROM users WHERE user_email=$1",
    checkUsername:"SELECT * FROM users WHERE user_username = $1",



    getPosts:"SELECT * FROM posts WHERE user_id=$1 OR USER_id IN (SELECT user_id2 FROM follows WHERE user_id1=$1",
    getUserPosts:"SELECT * FROM posts WHERE user_id=$1",
    newPost:"INSERT INTO posts (post_title,post_text,post_url,user_id,type_post_id) VALUES ($1,$2,$3,$4,$5)",
    deletePost:"DELETE FROM posts WHERE post_id=$1 AND user_id=$2",
    searchPost:"SELECT FROM posts WHERE post_title ILIKE $1",
    checkPost:"SELECT user_id FROM posts WHERE post_id = $1",

    getconfig:"SELECT * FROM configuration WHERE",


    getComments:"SELECT co.comment_id,co.comment_text,co.user_id,u.user_id,u.user_username FROM comments co INNER JOIN posts pos ON pos.post_id = co.post_id INNER JOIN users u ON u.user_id = co.user_id  WHERE co.post_id = $1",
    newComment:"INSERT INTO comments (comment_text, comment_url, post_id, user_id) VALUES ($1,$2,$4,$3)",
    updateComment:"UPDATE comments SET comment_text=$1 WHERE comment_id=$2 AND user_id=$3",
    deleteComment:"DELETE FROM comments WHERE comment_id=$1 AND user_id=$2",

    checkLike:"SELECT * FROM likes WHERE post_id=$1 AND user_id=$2",
    checkLikeType:"SELECT type_like_id FROM likes WHERE post_id=$1 AND user_id=$2",
    addLike:"INSERT INTO likes (post_id,user_id,type_like_id) VALUES ($1,$2,$3)",
    updateLike:"UPDATE likes SET type_like_id=$3 WHERE post_id=$1 AND user_id=$2",
    deleteLike:"DELETE FROM likes WHERE post_id=$1 and user_id=$2",
    countLikes:"SELECT COUNT(*) AS likes FROM likes WHERE post_id=$1 and type_like_id=1",
    countDislike:"SELECT COUNT(*) AS dislikes FROM likes WHERE post_id=$1 and type_like_id=2",


    checkFollow:"SELECT follow_id FROM follows WHERE user_id1=$1 AND user_id2=$2",
    follow:"INSERT INTO follows (user_id1, user_id2) VALUES ($1, $2)",
    unfollow:"DELETE FROM follows WHERE user_id1=$1 AND user_id2=$2",
    countFollowers:"SELECT COUNT(*) AS followers FROM follows WHERE user_id1=$1",
    countFollowees:"SELECT COUNT(*) AS followees FROM follows WHERE user_id2=$1",
    getFollowees:"SELECT * FROM follows WHERE user_id2=$1",
    getFollowers:"SELECT * FROM follows WHERE user_id1=$1"
}