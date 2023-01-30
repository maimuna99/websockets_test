import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";
let usersmap = {};
export default defineNuxtModule({
    setup(_, nuxt) {
        nuxt.hook("listen", (server) => {
            console.log("Socket listen", server.address());
            const io = new Server(server, {
                cors: {
                    origin: "*",
                },
            });

            io.on("connection", (socket) => {

                socket.emit("Welcome", "Welcome to the server")
                socket.on("message", (data) => {
                    socket.broadcast.emit("message", socket.nickname + ":" + data);
                })
            })



        });
    },
});