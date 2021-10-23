var net = require('net');


var server = net.createServer(function (socket) {
    // socket.write('Echo server\r\n');
    // socket.pipe(socket);

    var lport = socket.localPort;
    var laddr = socket.localAddress;

    console.log('\nconnect to local ip: ' + laddr);
    console.log('connect to local port: ' + lport);

});

// server.on('data', function(data) {
// 	console.log('Received: ' + data);
// 	// client.destroy(); // kill client after server's response
// });
// 172.18.2.4  10.11.2.2
server.listen(2222, '172.18.2.3');

server.on('listening', function () {

    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port: ' + port);
    console.log('Server is listening at ip: ' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
});


let num = 0;

server.on('connection', function (socket) {
    console.log('A new connection has been established.');

    console.log('A new client from: ' + socket.remoteAddress + ':' + socket.remotePort);

    socket.write('from server ', num++);

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
        console.log("recv data: " + chunk.toString());
        socket.write('from server ', num++);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function () {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function (err) {
        console.log(`Error: ${err}`);
    });

});


