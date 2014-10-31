var httpProxy = require('http-proxy')
	, from = process.argv[2]
	, to = process.argv[3]
if (!from || !to) {
	return console.error("Usage: node index.js <from> <to>\n"
		+ "  `from` and `to` are port numbers"
		+ "  don't forget `sudo` if `from` is 80")
}
httpProxy.createProxyServer({
	target: 'http://localhost:' + to
}).listen(from)
console.log("Forwarding port "
	+ from
	+ " to port "
	+ to)