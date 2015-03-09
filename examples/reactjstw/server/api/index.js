var mount = require("koa-mount");
var compose = require("koa-compose");

var adminUsers = require("./admin-users");

exports.routes = function () {
  return compose([
    mount("/api", adminUsers.routes()),
  ]);
};
