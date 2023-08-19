import {Server as SocketServer} from "socket.io"
import * as Handlers from "./handlers.js";


export const register = {

    register: function (server, options) {

        const io = new SocketServer(server.listener,{
            cors: {
                origin: ["http://localhost:3001","http://localhost:3000"] ,
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", function (socket) {

            console.log("New connection!");
            socket.on('hello', Handlers.hello);
/*          Example usage

            socket.on('newMessage', Handlers.newMessage);
            socket.on('goodbye', Handlers.goodbye); */
        });


    },
    name: "socket-server"
}
