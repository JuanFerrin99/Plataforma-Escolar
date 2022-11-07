class PrivateSocket {
    constructor() { }
    initServer(server, options) {
        this.io = require("socket.io")(server, options)
        this.sockets = {}

        this.io.on("connection", socket => {
            socket.on('connected', (mail) => {
                this.sockets[mail] = socket.id
            })

            socket.on('disconnect', () => {
                delete this.sockets[getKeyByValue(this.sockets, socket.id)]
            })
        })
    }
    emitCurso(mail, curso) {
        this.io.to(this.sockets[mail]).emit("nuevo curso", curso)
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
class Socket {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!Socket.instance) {
            Socket.instance = new PrivateSocket()
        }
        return Socket.instance;
    }
}
module.exports = Socket;