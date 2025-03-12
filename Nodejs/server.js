var http = require("http");

listener = function (request, response) { 
    response.writeHead(200, {'Content-Type': 'text/plain'});  // 200 is the status code, content type is text/plain
    response.end('Hello World'); // response body
}

http.createServer(listener).listen(3001); // create a server and listen on port 3001

console.log('Server running at http://localhost:3001/');
