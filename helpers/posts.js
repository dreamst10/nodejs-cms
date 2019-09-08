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
};
