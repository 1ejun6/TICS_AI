let canvas;
let context;
let paint;
let clickX = [];
let clickY = [];
let clickDrag = [];
let clickColor = [];
let clickSize = [];
let color = "#000000"; // default pen color
let size = 1; // default pen size

function startCanvas() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineJoin = "round";
    context.lineWidth = size;

    canvas.addEventListener("touchstart", function (e) {
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchmove", function (e) {
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY,
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchend", function (e) {
        let mouseEvent = new MouseEvent("mouseup");
        canvas.dispatchEvent(mouseEvent);
    });

    $("#canvas").mousedown(function (e) {
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
        drawCanvas();
    });

    $("#canvas").mousemove(function (e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            drawCanvas();
        }
    });

    $("#canvas").mouseup(function (e) {
        paint = false;
        drawCanvas();
    });

    $("#canvas").mouseleave(function (e) {
        paint = false;
    });
}

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(color);
    clickSize.push(size);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resetCanvas() {
    clickX = [];
    clickY = [];
    clickDrag = [];
    clickColor = [];
    clickSize = [];
    clearCanvas();
}

function drawCanvas() {
    clearCanvas();
    for (let i = 0; i < clickX.length; i++) {
        context.beginPath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function changePenColor(newColor) {
    color = newColor;
    context.strokeStyle = color;
}

function changePenSize(newSize) {
    size = newSize;
    context.lineWidth = size;
}