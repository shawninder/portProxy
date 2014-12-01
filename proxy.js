var httpProxy = require('http-proxy')
	, from = process.argv[2]
	, to = process.argv[3]
	, server

if (!from || !to) {
	return console.error("Usage: node proxy.js <from> <to>\n"
		+ "  `from` and `to` are port numbers"
		+ "  don't forget `sudo` if `from` is 80")
}

server = httpProxy.createProxyServer({
	target: 'http://localhost:' + to
})
server.on('error', function (err) {
	console.error("Oops", err)
})
server.listen(from)
console.log("Forwarding port "
	+ from
	+ " to port "
	+ to)