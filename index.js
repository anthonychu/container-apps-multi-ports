const http = require('http');

const ports = process.env.PORTS?.split(',') || [3000];

ports.forEach(port => {
    http.createServer(onRequest).listen(port);
    console.log(`Server running at http://localhost:${port}/`);
});

function onRequest(request, response) {
    console.log(`Request received at: ${request.url} on port ${request.socket.localPort}`)
    if (request.url?.startsWith('/curl')) {
        const urlToCurl = request.url.split('/curl/')[1];
        http.get(urlToCurl, (res) => {
            res.pipe(response);
        });
    } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write(`Response from ${process.env.HOSTNAME}:${request.socket.localPort}`);
        response.end();
    }
}