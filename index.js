var server = require("./server")
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/post"] = requestHandlers.post;
handle["/get"] = requestHandlers.get;
handle["/del"] = requestHandlers.del;
handle["/upd"] = requestHandlers.upd;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);