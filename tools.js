let optionscontainer = document.querySelector(".options-cont");
let toolscont = document.querySelector(".tools-cont");
let penciltoolcont = document.querySelector(".pencil-tool-cont"); // display:flex
let erasertoolcont = document.querySelector(".eraser-tool-cont"); // display:flex
let writingcolor="black";
let writingwidth="2";
optionscontainer.addEventListener("click", (e) => {
    let iconele = optionscontainer.children[0];
    let classofelement = iconele.classList[iconele.classList.length - 1];
    if (classofelement === "fa-bars") {
        iconele.classList.remove(classofelement);
        iconele.classList.add("fa-x");
        toolscont.style.display = "flex"
    }
    else {
        iconele.classList.remove(classofelement);
        iconele.classList.add("fa-bars");
        toolscont.style.display = "none"
        penciltoolcont.style.display = "none"
        erasertoolcont.style.display = "none"
    }
})
let toolchildren = toolscont.children;
let penciltoolflag = false;
let erasertoolflag = false;
for (let i = 0; i < toolchildren.length; i++) {
    toolchildren[i].addEventListener("click", (e) => {
        if (i == 0) { //pencil
            writingcolor="black"
            writingwidth="2";
            if (penciltoolflag) {

                penciltoolcont.style.display = "none"
               
            }
            else {

                penciltoolcont.style.display = "flex"
            }
            penciltoolflag = !penciltoolflag
        }
        else if (i == 1) { //eraser
            writingcolor="white"
            writingwidth="30";
            if (erasertoolflag) {
              
                erasertoolcont.style.display = "none"
            }
            else {

                erasertoolcont.style.display = "flex"
            }
            erasertoolflag = !erasertoolflag
        }
        else if (i == 2) { //ddownload
            console.log(toolchildren[i])
        }
        else if (i == 3) { //upload

            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.click();

            input.addEventListener("change", (e) => {
                let img = input.files[0];
                let url = URL.createObjectURL(img);
                let stickycont = document.createElement("div");
                stickycont.setAttribute("class", "sticky-cont")
                stickycont.innerHTML = ` <div class="header-cont">
           <div class="blue close"></div>   
           <div class="black minimize"></div>   
       </div>
       <div class="note-cont">
           <img class="ticket-task" src="${url}"></img>
       </div>`;
       stickycont.style.position="absolute"
       stickycont.style.top="10rem"
    //    stickycont.style.left="100"
                let header = stickycont.querySelector(".header-cont")
                let close = stickycont.querySelector(".close");
                close.addEventListener("click", e => {
                    stickycont.remove();
                })
                document.body.appendChild(stickycont);
                header.onmousedown = function (event) {
                    dragthesticky(stickycont, event);
                }
                header.ondragstart = function () {
                    return false;
                };
                let minimize = stickycont.querySelector(".minimize");
                minimize.addEventListener("click", e => {
                    let notecontainer = stickycont.querySelector(".note-cont");
                    let display = getComputedStyle(notecontainer).getPropertyValue("display")
                    if (display == "none") {
                        notecontainer.style.display = "block";
                    }
                    else {
                        notecontainer.style.display = "none";
                    }
                })
            })

        }
        else if (i == 4) { //stickynote
            let stickycont = document.createElement("div");
            stickycont.setAttribute("class", "sticky-cont")
            stickycont.innerHTML = ` <div class="header-cont">
           <div class="blue close"></div>   
           <div class="black minimize"></div>   
       </div>
       <div class="note-cont">
           <textarea class="ticket-task" spellcheck="false"  cols="15" rows="100" wrap="hard"></textarea>
       </div>`;
            let header = stickycont.querySelector(".header-cont")
            let close = stickycont.querySelector(".close");
            close.addEventListener("click", e => {
                stickycont.remove();
            })
            document.body.appendChild(stickycont);
            stickycont.style.position="absolute"
            stickycont.style.top="10rem"
            header.onmousedown = function (event) {
                dragthesticky(stickycont, event);
            }
            header.ondragstart = function () {
                return false;
            };
            let minimize = stickycont.querySelector(".minimize");
            minimize.addEventListener("click", e => {
                let notecontainer = stickycont.querySelector(".note-cont");
                let display = getComputedStyle(notecontainer).getPropertyValue("display")
                if (display == "none") {
                    notecontainer.style.display = "block";
                }
                else {
                    notecontainer.style.display = "none";
                }
            })

        }
        else if (i == 5) { //redo
            console.log(toolchildren[i])
        }
        else if (i == 6) { //undo
            console.log(toolchildren[i])
        }
    })
}
function dragthesticky(ball, event) {


    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;


    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX - 48 + 'px';
        ball.style.top = pageY - shiftY - 48 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    ball.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };


}