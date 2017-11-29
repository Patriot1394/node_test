var http = require("http");
var url = require("url");
var db = require("./db");


function start(route, handle) {

    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        var postData = url.parse(request.url).query;

        route(handle, pathname, response, postData);

    }
    var server = http.createServer(onRequest);
    db.sequelize.sync().then(function () {
        server.listen(8888)
    })


    console.log("Server has started.");
}

exports.start = start;