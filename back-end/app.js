const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var originImgReady = false;
var scribbleImgReady = false;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


var getHtml = function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    fs.readFile('../front-end/index.html', function(err, data) {
        response.end(data);
    });
};

app.get('/', getHtml);

app.get('/style.css', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    fs.readFile('../front-end/style.css', function(err, data) {
        response.end(data);
    });
});

app.get('/getJob', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css');
    if (originImgReady && scribbleImgReady) {
        response.end("Ready");
        originImgReady = false;
        scribbleImgReady = false;
    } else {
        response.end("No Data Yet!");
    }
});


app.get('/index.js', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    fs.readFile('../front-end/index.js', function(err, data) {
        response.end(data);
    });
});

app.get('/jquery-3.2.1.js', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    fs.readFile('../front-end/jquery-3.2.1.js', function(err, data) {
        response.end(data);
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.post('/api/originImg', function(request, response) {
    var originImgData = Object.keys(request.body)[0].replace(/\s/g, '+').replace(/^data:image\/png;base64,/, "");
    fs.writeFile("originImage.png", originImgData, 'base64', function(err) {
        console.log(err);
    });

    response.statusCode = 200;
    originImgReady = true;
    response.end("Original image received!");
});

app.post('/api/scribbleImg', function(request, response) {
    var scribbleImgData = Object.keys(request.body)[0].replace(/\s/g, '+').replace(/^data:image\/png;base64,/, "");
    fs.writeFile("scribbleImg.png", scribbleImgData, 'base64', function(err) {
        console.log(err);
    });

    response.statusCode = 200;
    scribbleImgReady = true;
    response.end("Scribble image received!");
});