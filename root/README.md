# Server to populate and search data on Caradisiac

## Introduction

This project allow you to populate your ElasticSearch database, with node-car-api.
Of course, you need to have ElasticSearch on your machine (Port: 9200).

##### What is Node.Js ? 
Node.js is an open source project designed to help you write JavaScript programs that talk to networks, file systems or other I/O (input/output, reading/writing) sources.

More information [here](https://github.com/92bondstreet/javascript-empire#course-3---nodejs-master-of-universe)

## Installation

To use this converter, multiple libraries are required. 
We need : 
* express
* body-parser
* https://github.com/92bondstreet/node-car-api.git

To install a library, the command is :
```console
npm install [NameOfTheLibrary]
```
----------
For example, to install the caradisiac library : 
```console
npm install https://github.com/92bondstreet/node-car-api.git
```

## How to use 

1. Launch node.js
1. Go to the root directory (For example C:\Users\Username\Documents\GitHub\caradisiac\root) using the cd command
1. Execute the server, like this : 
```console
node server.js
``
1. Open Postman
1. To populate the database, just do on Postman : 
(GET) localhost:9292/populate *
1. To get the 10 cars with the higher volume, do :
(GET) localhost:9292/suv


* : keep watching the server console, to see the advancement of the request.
