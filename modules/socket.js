import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";
let connectedUsers = [];
export default defineNuxtModule({
    setup(_, nuxt) {
        nuxt.hook("listen", (server) => {
            console.log("Socket listen", server.address(), server.eventNames());
            const io = new Server(server);

            nuxt.hook("close", () => io.close());

            io.on("connection", (socket) => {
                console.log("Connection", socket.nickname);
                //level 5
                connectedUsers.push(socket.nickname);
                io.emit('update users', connectedUsers);
                //level 1
                console.log('a user connected');
                socket.broadcast.emit('user connected', { message: 'A user has connected ' + socket.nickname });

                socket.on('disconnect', () => {
                    connectedUsers = connectedUsers.filter(nickname => nickname !== socket.nickname);
                    io.emit('update users', connectedUsers);
                    console.log('user disconnected');
                    socket.broadcast.emit('user disconnected', { message: 'A user has disconnected' });
                });

                socket.on('new message', (data) => {
                    data.nickname = socket.nickname;
                    socket.broadcast.emit('new message', data);
                });
                //level 2
                socket.on('set nickname', (nickname) => {
                    socket.nickname = nickname;
                });
                //level 4
                socket.on("typing", (data) => {
                    socket.broadcast.emit("typing", "user is typing...")
                })
            });


        });
    },
});