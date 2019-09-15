async function getUserInfo(api, idUserArr) {
    api.getUserInfo(idUserArr, (err, ret) => {
        if(err) return console.error(err);

        for(var prop in ret) {
            console.log(ret);
        }
    });
}


module.exports = {
    getUserInfo
}