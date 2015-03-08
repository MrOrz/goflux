var router = require("koa-router")();

router.get("/admin-users", function* () {
  var adminUsersList = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate response from fb/group
      // https://developers.facebook.com/docs/graph-api/reference/v2.2/group/members
      resolve([
        {
          "name": "Simon Pai", 
          "administrator": true, 
          "id": "10152348409666403"
        }, 
        {
          "name": "Chun Wei Lee", 
          "administrator": true, 
          "id": "766615266682512"
        }, 
        {
          "name": "Tom Chen", 
          "administrator": true, 
          "id": "100001053090034"
        }, 
        {
          "name": "陳柏儒", 
          "administrator": true, 
          "id": "990485934301721"
        }, 
        {
          "name": "唐鳳", 
          "administrator": true, 
          "id": "10152502850754928"
        }, 
        {
          "name": "Jeremy Lu", 
          "administrator": true, 
          "id": "10152165268513423"
        }, 
        {
          "name": "Ly Cheng", 
          "administrator": true, 
          "id": "10152497384142883"
        },
      ]);

    }, 1500);
  });

  this.body = adminUsersList;

});

module.exports = router;
