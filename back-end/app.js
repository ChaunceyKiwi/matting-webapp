const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

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
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile('../front-end/style.css', function(err, data) {
        response.end(data);
    });
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
    console.log(request.body);
    response.statusCode = 200;
    response.end("Original image received!");
});

app.post('/api/scribbleImg', function(request, response) {
    console.log(request.body);
    response.statusCode = 200;
    response.end("Scribble image received!");
});