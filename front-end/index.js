var imageLoaded = 0;
var lastX, lastY;
var mousePressed = false;
var input, ctx, myCanvas, originImage;
var touchX, touchY;

/* TODO: modify socket to connect to a local or a remote IP 
 * address and corresponding port number that runs server */
var serverAddr = "localhost:3000"; /* e.g. 192.168.1.74:3000 */

window.onload = function() {
    initialization();
    input.addEventListener("change", handleFiles, false);
};

function handleFiles(e) {
    var url = window.URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 600, 400);
        originImage = document.getElementById("myCanvas").toDataURL();
        imageLoaded = 1;
    };
    img.src = url;
}

function initialization() {
    myCanvas = $("#myCanvas");
    ctx = document.getElementById("myCanvas").getContext("2d");
    input = document.getElementById("imgInp");

    myCanvas.mousedown(function (e) {
        if (imageLoaded) {
            mousePressed = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        } else {
            alert("Image not loaded yet!");
        }
    });

    myCanvas.mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    myCanvas.mouseup(function (e) {
        mousePressed = false;
    });

    myCanvas.mouseleave(function (e) {
        mousePressed = false;
    });

    // React to touch events on the canvas
    document.getElementById("myCanvas").addEventListener('touchstart', sketchpad_touchStart, false);
    document.getElementById("myCanvas").addEventListener('touchmove', sketchpad_touchMove, false);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $("#markerColor").val();
        ctx.lineWidth = $("#markerSize").val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function drawDot(x,y,size) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=0; g=0; b=0; a=255;

    // Select a fill style
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}

// Draw something when a touch start is detected
function sketchpad_touchStart() {
    // Update the touch co-ordinates
    getTouchPos();

    Draw(touchX, touchY, false);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) {
    // Update the touch co-ordinates
    getTouchPos(e);

    Draw(touchX, touchY, true);

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}

$("#resetBtn").click(function() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});

document.getElementById("start").addEventListener("click", function() {
    $.post('/api/originImg', originImage, function(result) {
        console.log(result);
    });

    var scribbleImg = document.getElementById("myCanvas").toDataURL();
    $.post('/api/scribbleImg', scribbleImg, function(result) {
        console.log(result);
    });
}, false);

var socket = io.connect(serverAddr);

socket.on('news', function (data) {
    if (data == "Job is finished!") {
        document.getElementById("foreground").src="foreground.jpg";
        document.getElementById("background").src="background.jpg";
    }
});
