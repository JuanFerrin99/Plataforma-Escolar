const sockets = []

module.exports.handleIo = function(io){
    sockets.push(io)
}

module.exports.deleteIo = function(io){
    index = sockets.indexOf(io)
    if(index != -1){
        sockets.splice(index, 1)
    }
}