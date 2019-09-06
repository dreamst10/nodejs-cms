const db = require('../utilities/db');
const properties = require('../utilities/properties');

module.exports.checkFollow=(followeeId,followerId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.any(properties.checkFollow,[followeeId,followerId])
                .then(data=>{
                    res(data);
                    obj.done();
                }).catch(err=>{
                    rej({
                        error:err,
                        status:500,
                        message:'not created'
                    });
                    obj.done();
                });
        });
    });
};

module.exports.follow=(followeeId,followerId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(properties.follow,[followeeId,followerId])
                .then(()=>{
                    res({
                        message:'follow established',
                        status:200
                    });
                    obj.done();
                }).catch(err=>{
                    rej({
                        error:err,
                        message:'not created',
                        status:500
                    });
                    obj.done();
                });
        });
    });
};

module.exports.unfollow=(followeeId,followerId)=>{
    return new Promise((res,rej)=>{
        db.connect().then(obj=>{
            obj.none(properties.unfollow,[followeeId,followerId])
                .then(()=>{
                    res({
                        message:'no longer following',
                        status:200
                    });
                    obj.done();
                }).catch(err=>{
                    rej({
                        error:err,
                        message:'not created',
                        status:500
                    });
                    obj.done();
                });
        });
    });
};