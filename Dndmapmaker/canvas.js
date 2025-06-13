var subject = document.getElementById("placehold");
subject.style.left = 0;
var pos = [0, 0];
var props = [];
var elementcount = 0;
var save = ""
var base = document.getElementById("board")

var mousemove = (evnt)=>{subject.style.left = (parseInt(subject.style.left) + (evnt.pageX - pos[0])) +"px";
    pos[0] = evnt.pageX;
    subject.style.top = (parseInt(subject.style.top) + (evnt.pageY - pos[1])) +"px";
    pos[1] = evnt.pageY;
    subject.style.rotate = "0deg";
    subject.style.position = "absolute";
    //subject.style.transform
}
function newelement(name){
    console.log(name)
    subject = document.getElementById(name);
}
function spawnnew(image, element){
    const currentnum= elementcount.toString();
    const boundrect = document.getElementById(element).getBoundingClientRect();
    var newele = document.createElement("div");
    newele.id = currentnum
    newele.style.position = "absolute";
    newele.className = "draggable";
    newele.style.backgroundImage = image;
    newele.style.minWidth = boundrect.width + "px";
    newele.style.minHeight = boundrect.height + "px";
    newele.style.left = boundrect.left + "px";
    newele.style.top = boundrect.top + "px";
    newele.onmousedown = function() {newelement(currentnum);};
    base.insertBefore(newele, document.getElementById("placehold"));
    subject = document.getElementById(elementcount.toString());
    props = props.concat(document.getElementById(currentnum));
    elementcount++;
    delete currentnum, boundrect;
}
var mousedown = (evnt)=>{subject.style.left = subject.offsetLeft + "px";
    subject.style.top = subject.offsetTop + "px";
}
function mouseup (evnt){
    if(document.elementsFromPoint(evnt.clientX, evnt.clientY).includes(document.getElementById("side")) && subject.id != "placehold"){
        props.splice(props.indexOf(subject), 1);
        subject.remove();
    }
    subject=document.getElementById("placehold");
}
var unload = ()=>{let i = 0;
    let totality = [];
    while(i < props.length){
        totality = totality.concat([props[i].style.backgroundImage,
            [props[i].style.left, props[i].style.top], 
            [props[i].style.minWidth, props[i].style.minHeight]]);
        i++;
    }
    let d = new Date(Date.now());
    d.setTime(d.getTime() + (400*24*3600*1000));
    console.log(totality.toString(), d.toUTCString());
    document.cookie = "everything=" + totality.toString() + "; expires=" + d.toUTCString() +";" + "path= ./";
    save = "everything=" + totality.toString() + "; expires=" + d.toUTCString() +";" + "path= ./";
}
function load(){
    let a = save.split(";")[0].split("=")[1].split(",");
    document.getElementById("board").remove();
    let x =document.createElement("div");
    x.id="board";
    document.body.insertBefore(x, document.getElementById("side"));
    base = document.getElementById("board")
    newplacehold = document.createElement("div")
    newplacehold.id = "placehold";
    newplacehold.style.height = "0px";
    newplacehold.style.width = "0px";
    newplacehold.style.position= "absolute";
    base.insertBefore(newplacehold, null)
    let i = 0
    elementcount = 0
    props = []
    while(i < a.length){
        const currentnum= elementcount.toString();
        let newele = document.createElement("div");
        newele.id = elementcount.toString()
        newele.style.position = "absolute";
        newele.className = "draggable";
        newele.style.backgroundImage = a[i];
        newele.style.position = "absolute";
        newele.style.left = a[i+1];
        newele.style.top = a[i+2];
        newele.style.minWidth = a[i+3];
        newele.style.minHeight = a[i+4];
        newele.onmousedown = function() {newelement(currentnum.toString());};
        base.insertBefore(newele, document.getElementById("placehold"));
        subject = document.getElementById(elementcount.toString());
        props = props.concat(document.getElementById(currentnum.toString()));
        elementcount++;
        i+=5;
        delete currentnum;
    }
    subject = document.getElementById("placehold");
}
//TODO: MAKE RESIZE AND ROTATE BOX
document.addEventListener("mousemove", mousemove);
document.addEventListener("mouseup", (evnt)=>{mouseup(evnt)});
document.addEventListener("mousedown", mousedown);
document.addEventListener("beforeunload", unload);
//document.addEventListener("wheel", ()=>{});
