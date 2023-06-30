const express=require("express") // return fnc for acess
const socket=require("socket.io") // return function for initialization

const app=express() // initialize app and server ready
app.use(express.static("frontend")) // to show the index.html file
let server=app.listen(3000,()=>{ // first hit here
    console.log("listening to port" + 3000);
})

let io=socket(server) //connected
io.on("connection",(socket)=>{//2hit here
    console.log("connection established successfully");
    //received data
    socket.on("beginpath",(data)=>{
        // now transfer data to all connected computers
        io.sockets.emit("beginpath",data)
    }) 

    socket.on("drawstroke",(data)=>{
        // now transfer data to all connected computers
        io.sockets.emit("drawstroke",data)
    }) 
    socket.on("redoundo",(data)=>{
        // now transfer data to all connected computers
        io.sockets.emit("redoundo",data)
    }) 
})