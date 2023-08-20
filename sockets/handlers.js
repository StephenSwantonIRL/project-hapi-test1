
export const listeners = {
    socketObject: null,
    setSockets: function (socket) {
        this.socketObject = socket
    },


    responseSubmitted : function (sessionId) {
        this.broadcast.emit((`${sessionId.toString()}-response`))
},
    activeQuestion : function (sessionId) {
        this.broadcast.emit((`${sessionId.toString()}-question`))
    }

}
