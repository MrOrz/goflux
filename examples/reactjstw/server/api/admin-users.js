var router = require("koa-router")();

router.get("/admin-users", function* () {
  var adminUsersList = yield Promise.resolve(["Jeremy", "Randy", "Tom"]);

  this.body = adminUsersList;

});

module.exports = router;
