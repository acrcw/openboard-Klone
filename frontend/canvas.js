let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousedown = false;
let tracker = [];
let track = 0;
let pencilcolorall = document.querySelectorAll(".pencil-color");
let erasercolorall = document.querySelectorAll(".eraser-color");
let download = document.getElementById("download");


let pencilwidth = document.getElementById("pencil-width").value;
let pencilwidthrange = document.getElementById("pencil-width");
let undo = document.getElementById("undo");
let redo = document.getElementById("redo");
pencilwidthrange.addEventListener("change", (e) => {
    writingwidth = pencilwidthrange.value;
})
let eraserwidthrange = document.getElementById("eraser-width");
eraserwidthrange.addEventListener("change", (e) => {
    writingwidth = eraserwidthrange.value;
})
let pencilcolor = "black";
pencilcolorall.forEach((colorele) => {
    colorele.addEventListener("click", (e) => {
        writingcolor = colorele.classList[0]
    })
})
erasercolorall.forEach((colorele) => {
    colorele.addEventListener("click", (e) => {
        writingcolor = colorele.classList[0]
    })
})
//api
let tool = canvas.getContext("2d"); // get 2d tool


// mousedown >> start new path, mousemove -> pathfill
canvas.addEventListener("mousedown", (e) => {

    tool.strokeStyle = writingcolor
    tool.lineWidth = writingwidth
    mousedown = true;
    tool.beginPath();
    tool.moveTo(e.clientX, e.clientY)

    //for server
    let data = {
        writingclr: writingcolor,
        width: writingwidth,
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginpath", data) // socket comes from index.html
})

canvas.addEventListener("mousemove", (e) => {

    if (mousedown) {
        let data = {
            writingclr: writingcolor,
            width: writingwidth,
            x: e.clientX,
            y: e.clientY
        }
        socket.emit("drawstroke", data)
        // tool.lineTo(e.clientX + 0, e.clientY);
        // tool.stroke()
    }

})
canvas.addEventListener("mouseup", (e) => {

    mousedown = false;
    let url = canvas.toDataURL();
    tracker.push(url);
    track = tracker.length - 1
})
download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url
    a.download = "board.jpg";
    a.click();
})
undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    let data = {
        trackercontainer: tracker,
        index: track
    }
    socket.emit("redoundo", data);
    // undoredocanvas();
})
redo.addEventListener("click", (e) => {
    if (track < tracker.length - 1) track++;
    let data = {
        trackercontainer: tracker,
        index: track
    }
    socket.emit("redoundo", data);
    // undoredocanvas();
})
function undoredocanvas() {
    let img = new Image(); // create image reference
    img.src = tracker[track];
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
function beginpath(strokeobj) {
    console.log(strokeobj)
    tool.strokeStyle = strokeobj.writingclr;
    tool.lineWidth = strokeobj.width;
    tool.beginPath();
    tool.moveTo(strokeobj.x, strokeobj.y);
}
function drawstroke(strokeobj) {
    tool.strokeStyle = strokeobj.writingclr
    tool.lineWidth = strokeobj.width
    tool.lineTo(strokeobj.x, strokeobj.y);
    tool.stroke()
}

// to detect repeated data
socket.on("beginpath", (data) => {
    // data from server
    beginpath(data);
})

socket.on("drawstroke", (data) => {
    // data from server
    drawstroke(data);
})

socket.on("undoredo", (data) => {
    // data from server
    undoredocanvas(data);
})