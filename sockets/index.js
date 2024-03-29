import {Server as SocketServer} from "socket.io"
import {listeners as socketListeners} from "./handlers.js";


export const register = {

    register: function (server, options) {

        const io = new SocketServer(server.listener,{
            cors: {
                origin: ["http://localhost:3001","http://localhost:3000"] ,
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", function (socket) {
            socketListeners.setSockets(socket)
            console.log("New connection!");
            socket.on("response submitted", socketListeners.responseSubmitted)
            socket.on("active question", socketListeners.activeQuestion)
        });

    },
    name: "socket-server"
}
