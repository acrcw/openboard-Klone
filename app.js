const express=require("express") // return fnc for acess
const socket=require("socket.io") // return function for initialization

const app=express() // initialize app and server ready
app.use(express.static("frontend")) // to show the index.html file
let port=process.env.PORT || 5000
let server=app.listen(port,()=>{ // first hit here
    console.log("listening to port" + port);
})

let io=socket(server) //connected
io.on("connection", (socket) => {
    const transport = socket.conn.transport.name; // in most cases, "polling"
    console.log(transport)
    socket.conn.on("upgrade", () => {
      const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
      console.log(upgradedTransport)
    });
  });
io.on("connection",(socket)=>{//2hit here
    console.log("connection established successfully");
    console.log(socket.id);
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