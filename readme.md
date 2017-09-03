# Image Matting Webapp

## Structure
* Front-end
* Back-end
* C style program

## Requirements
* Node.js
* CMake

## Setup
1. Install openCV library on your local machine, following instructions on 
http://docs.opencv.org/3.3.0/d7/d9f/tutorial_linux_install.html
2. Install SuiteSparse.tar.gz from http://faculty.cse.tamu.edu/davis/suitesparse.html and unzip it to the directory `/matting-webapp/c-program`, run following instructions to install library:
  ```
  cd /matting-webapp/c-program/SuiteSparse
  make library
  ```
3. Open file in the path `/matting-webapp/front-end/index.js`, modify socket to connect to a local or a remote IP address and corresponding port number that runs server. 
```
You can find local IP address by runnning `ifconfig | grep 192` on server

(line 9) var serverAddr = "localhost:3000"; /* e.g. 192.168.1.74:3000 */
```

  
## Server: build
1. Run following instructions to start the Node.js server to perform user interaction
```
cd /matting-webapp/back-end;
npm install;
node app.js;
```

2. Run following instructions to start the cpp program to perform calculation:
```
cd /matting-webapp/c-program/make;
cmake .;
make;
./imageMatting;
```

## Client: how to run
Follow instructions in the video: https://www.youtube.com/watch?v=uYu_CdfbREE
