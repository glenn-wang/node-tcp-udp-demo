var net = require('net');

var client = new net.Socket();


let num = 0;

//  10.11.1.1  127.0.0.1  172.18.2.4  10.11.2.2  10.11.1.1

client.connect(2222, '172.18.2.3', function () {
	console.log('Connected');
 
	setInterval(function () {

		console.log("🥉-----send data");

		client.write('from clinet ' + (++num));

	}, 1000);

});

client.on('data', function (data) {
	console.log('Received: ' + data);

	// client.destroy(); // kill client after server's response
});

client.on('close', function () {
	console.log('Connection closed');
});
