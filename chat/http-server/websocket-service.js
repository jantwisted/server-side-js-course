const ws = require('ws')
let server;

var smsg = {}
var messages = new Array();
var clients_array = new Array()

function init(httpServer){
    server = new ws.Server({server: httpServer});
    server.on('connection', socket => {
        var sender
        var chat_message        
        socket.on('message', data => {
            console.log(data.toString())
            dmsg = JSON.parse(data)
            if(dmsg.type == 'join'){
                smsg.joined = 'True'
                sender = dmsg.name 
                clients_array.push({'client':socket, 'name':sender})
                chat_message = sender + ' joined the chat!'
            } else if (dmsg.type == 'message'){
                clients_array.forEach(c => {
                    if (c.client === socket){
                        sender = c.name
                    }
                });
                chat_message = dmsg.message
            }
            messages.push({'sender':sender, 'message':chat_message})
            smsg['messages'] = messages  
            server.clients.forEach(function each(client){                                  
                if(client.readyState === ws.OPEN){
                    client.send(JSON.stringify(smsg))
                }
            })                        
        })
 
        socket.on('error', err => console.error(err))
    })
}


module.exports = {
    init
}


