const db = require('../utilities/db.js');
const props = require('../utilities/properties.js');

module.exports.createPost = (title,text,url,userId,typePost) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none(props.newPost, [title,text,url,userId,typePost])
                .then(() => {
                    res({
                        message: "OK. Post created",
                        status: 200
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'not Created',
                        status: 500
                    });
                    obj.done();
                });
        });
    });
};

module.exports.deletePost=(postId,userId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(props.deletePost,[postId,userId])
                .then(()=>{
                    res({
                        message:'Ok. Post deleted',
                        status:200
                    });
                    obj.done();
                }).catch(error=>{
                    rej({
                        error:error,
                        message:'not created',
                        status:500
                    });
                    obj.done();
                });
        }).catch(err=>{
            console.log(err);
            rej(err);
        });
    });
};


module.exports.getPosts = (userId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(props.getPosts, [userId, userId])
                .then((data) => {
                    
                    res({
                        message: "Got all Posts for this user",
                        status: 200,
                        data:data
                    });
                    obj.done();
                }).catch((error) => {
                    console.log(error)
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 500
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};

module.exports.getOtherData = (postId) =>{
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one(props.countLikes, [postId])
                .then((data) => {
                    obj.one(props.countDislikes, [postId])
                        .then((newData) => {
                            obj.one(props.countComments, [postId])
                                .then((moreData) => {
                                    res({
                                        likes: data.likes,
                                        dislikes: newData.dislikes,
                                        comments: moreData.comment_quantity
                                    })
                                    obj.done();
                                }).catch(err=>rej(err))
                        }).catch(err=>rej(err))
                })
                .catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 500
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
}


/*
module.exports.getUserPosts = (userId) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(props.getUserPosts, [userId])
                .then((data) => {
                    res({
                        message: "Got all Posts for this user",
                        status: 200,
                        data:data
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 500
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });
    });
};*/

module.exports.newLike = (postId,userId,typeLike) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(props.checkLike, [postId,userId])
                .then((data) => {
                    console.log(data[0].type_like_id);
                    if(data == ''){
                        obj.none(props.addLike, [postId,userId,typeLike]);
                        res({
                            message: "Like insert",
                            status: 200,
                        });
                        
                    }
                    else if(data[0].type_like_id==typeLike){
                        obj.none(props.deleteLike,[postId,userId]);
                        res({
                            message:'Like delete',
                            status:200
                        })
                    }
                    else{
                        obj.none(props.updateLike, [postId,userId,typeLike]);
                        res({
                            message: "Like change",
                            status: 200,
                        });
                    }
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 500
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};

