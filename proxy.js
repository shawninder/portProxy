var httpProxy = require('http-proxy')
	, fs = require('fs')
	, from = process.argv[2]
	, to = process.argv[3]
	, pass = process.argv[4]
	, options = {}
	, server

if (!from || !to) {
	return console.error("Usage: node proxy.js <from> <to>\n"
		+ "  `from` and `to` are port numbers\n"
		+ "  don't forget `sudo` if `from` is 80")
}

if (from === '443') {
	options.ssl = {
		key: fs.readFileSync('cert/private_key.pem')
		, cert: fs.readFileSync('cert/certificate.pem')
	}
	if (pass) {
		options.ssl.passphrase = pass
	}
	options.secure = false
}
options.target = 'http://'

options.target += 'localhost:' + to

server = httpProxy.createProxyServer(options)
server.on('error', function (err) {
	console.error("Oops", err)
})
server.listen(from)
console.log("Forwarding port "
	+ from
	+ " to "
	+ to)