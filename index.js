var server = require("./server")
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.get;
handle["/post"] = requestHandlers.post;
handle["/get"] = requestHandlers.get;
handle["/del"] = requestHandlers.del;
handle["/upd"] = requestHandlers.upd;

server.start(router.route, handle);