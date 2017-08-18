var imageLoaded = 0;
var lastX, lastY;
var mousePressed = false;
var input, ctx, myCanvas, originImage;


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

