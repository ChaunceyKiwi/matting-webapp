# Image Matting Webapp
For more details about matting algorithm applied, check [this repository](https://github.com/ChaunceyKiwi/imageMatting).

## Structure
* Front-end
* Back-end
* C style program

## Requirements
* Node.js
* CMake
* SuiteSparse

## Setup
1. Install openCV library on your local machine, following the instructions from [the official tutorial](http://docs.opencv.org/3.3.0/d7/d9f/tutorial_linux_install.html).

2. Download SuiteSparse.tar.gz from [here](http://faculty.cse.tamu.edu/davis/suitesparse.html) and unzip it to the directory `/matting-webapp/c-program`, run following instructions to install library:
  ```
  cd /matting-webapp/c-program/SuiteSparse
  make library
  ```
3. Open file in the path `/matting-webapp/front-end/index.js`, modify socket to connect to a local or remote IP address and corresponding port number that runs server. 
```
You can find local IP address by runnning `ifconfig | grep 192` on server

(line 9) var serverAddr = "localhost:3000"; /* e.g. 192.168.1.74:3000 */
```
  
## Server: build
1. Run following instructions to setup the Node.js server to perform user interaction:
```
cd /matting-webapp/back-end;
npm install;
node app.js;
```

2. Run following instructions to open the cpp program and perform calculation:
```
cd /matting-webapp/c-program/make;
cmake .;
make;
./imageMatting;
```

## Demo for client
Follow instructions in this [youtube video](https://www.youtube.com/watch?v=0mweR35C6nc).
