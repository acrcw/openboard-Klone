const express = require("express") // return fnc for acess
const socket = require("socket.io") // return function for initialization
const app = express() // initialize app and server ready
let port = process.env.PORT || 5000
const server = app.listen(port);
app.use(express.static("frontend")) // to show the index.html file





const io = new socket.Server(server, { cors: { origin: '*' } });
io.on("connection", (socket) => {//2hit here
    console.log("connection established successfully");
    console.log(socket.id);

    //received data
    socket.on("beginpath", (data) => {
        // now transfer data to all connected computers
        io.sockets.emit("beginpath", data)
    })

    socket.on("drawstroke", (data) => {
        // now transfer data to all connected computers
        io.sockets.emit("drawstroke", data)
    })
    socket.on("redoundo", (data) => {
        // now transfer data to all connected computers
        io.sockets.emit("redoundo", data)
    })
})