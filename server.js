var http = require("http");
var url = require('url');
var events = require('events');
var util = require('util');
var fs = require('fs');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('/', function(req, res){
    var query = url.parse(req.url, true).query;

    //var foo = querystring.parse(query)["foo"];
    //console.log("foo=" + foo);
    console.log("foo=" + query.foo);
    console.log("url=" + query.url);


    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(util.inspect(url.parse(req.url, false)) + "\n");
    res.write(util.inspect(url.parse(req.url, true)) + "\n");
    res.end('Hello World\n');
});

eventEmitter.on('404', function(req, res){
   res.writeHead(404, {'Content-Type': 'text/plain'});
   res.end('404 Not Found\n');
});

function start() {
    function onRequest(req, res) {
        console.log("url:" + req.url);
        var pathname = url.parse(req.url).pathname;
        console.log("pathname: " + pathname);

        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data.toString());
            }
            res.end();
        });
                    
        /*if (eventEmitter.listenerCount(pathname) > 0){
            eventEmitter.emit(pathname, req, res);
        }
        else {
            eventEmitter.emit('404', req, res);
        }*/
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server running at http://127.0.0.1:8888/');
}
 
exports.start = start;

