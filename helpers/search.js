const db = require('../utilities/db');
const props = require('../utilities/properties');

module.exports.searchUser = (value) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any(props.searchUser, [value])
                .then((data) => {
                    res({
                        message: "you got users",
                        status: 200,
                        data: data
                    });
                    obj.done();
                }).catch((error) => {
                    rej({
                        error: error,
                        msg: 'Error',
                        status: 403
                    });
                    obj.done();
                });
        }).catch((error) => {
            console.log(error);
            rej(error);
        });;
    });
};