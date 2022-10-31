const sockets = []

module.exports.handleIo = function(io){
    sockets.push(io)
    console.log(sockets.map(a => a.toString()))
}

module.exports.deleteIo = function(io){
    index = sockets.indexOf(io)
    if(index != -1){
        sockets.splice(index, 1)
    }
    console.log(sockets.map(a => a.toString()))
}