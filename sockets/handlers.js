
export const listeners = {
    socketObject: null,
    setSockets: function (socket) {
        this.socketObject = socket
    },

    hello: function () {
        this.broadcast.emit("Hi back at you");
    },

    responseSubmitted : function (sessionId) {
    this.broadcast.emit(sessionId.toString())
},
    session : function () {
        this.broadcast.emit("Session received")
        console.log("session received")
    }

}
