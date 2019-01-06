import * as jwt from 'jsonwebtoken';
import {IENV} from "../environment/ienv";
const env: IENV = require("../environment/dev.json");
import * as http from "http";
import {UserController} from "../controllers/UserController";
const httpServer = http.createServer();
const io = require("socket.io")(httpServer);

class Socket {
    private userCtrl: UserController = new UserController();
    public start() {
        const _this = this;
        io.set('origins', '*:*');
        httpServer.listen(3001);

        io.on("connection", function (client) {
            // client.use((socket, next) => {
            //     let token: string = client.handshake.query.token;
            //     jwt.verify(token, env.token.user_secret, function (error, decoded) {
            //         if (error) {
            //             next(new Error("INVALID_TOKEN"));
            //         } else {
            //             client.user = decoded;
            //             next();
            //         }
            //     });
            // });

            client.on("connection-status", function (data) {
                let userId: string = data.userId;
                _this.userCtrl.update({isOnline: data.isConnected}, userId);
            });

        });
    }
}

let socket: Socket;

if (!socket) {
    socket = new Socket();
}

export {socket};