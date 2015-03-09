var Path = require("path");
var koa = require("koa");

var api = require("./api");
var server = require("./server");

var app = koa();

app.use(require("koa-static")(
  Path.resolve(__dirname, "../public"),
  {
    maxage: 31536000,
  }
));

app.use(api.routes());

app.use(function* () {

  var html = yield server.index(this.url, this.query);

  this.body = html;

});

app.listen(3000);
