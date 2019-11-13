const http = require('http');
const port = 3006;
const fs = require('fs');
const wssServer = require('./websocket-service')

const server = http.createServer(processRequest)
wssServer.init(server)
let sockets = []

function processRequest(request, response){
    console.log(request.url);
    switch(request.url){
        case '/':
            getFile('./public/index.html', response)
            break
        default:
            getFile('public' + request.url, response)
    }
}


function getFile(path, response){
    fs.readFile(path, (err, data) => {
        if(err){
            response.writeHead(404)
            response.end()
        }
        else {
            response.writeHead(200)
            response.write(data)
            response.end()
        }
    })
}


server.listen(port);
