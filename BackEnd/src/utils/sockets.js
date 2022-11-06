const sockets = {}


module.exports.newSocket = function (mail, id) {
    sockets[mail] = id
}
module.exports.deleteSocket = function (id) {
    delete sockets[getKeyByValue(sockets, id)]
}

module.exports.handleSocket = function (mail) {
    return sockets[mail]
}


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}