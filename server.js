var http = require("http");
var url = require('url');
const { exit } = require("process");
var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('/', function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});

eventEmitter.on('404', function(request, response){
   response.writeHead(404, {'Content-Type': 'text/plain'});
   response.end('404 Not Found\n');
});

function start() {
    function onRequest(request, response) {
        console.log("url:" + request.url);
        var pathname = url.parse(request.url).pathname;
        console.log("pathname: " + pathname);
            
        if (eventEmitter.listenerCount(request.url) > 0){
            eventEmitter.emit(request.url, request, response);
        }
        else {
            eventEmitter.emit('404', request, response);
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server running at http://127.0.0.1:8888/');
}
 
exports.start = start;

