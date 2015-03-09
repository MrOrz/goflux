import Goflux from "goflux";

const RoutingActions = Goflux.defineActions("RoutingActions", function (context) {
  return {
    route (url, params) {
      /*
       * Handle your routing logic here, please replace your favorate routing
       * libraries. Ex, routr, director, page.js ...
       *
       * If you want it runs isomorphic, make sure it does provide
       * implementations on browser and node.js.
       */
      var matchedResult;
      if ("/" === url) {

        context.dispatch("OPEN_INDEX_PAGE", {/* payload */
        });

        return context.getActions("RoutingActions").setPageTitle("Index | Reactjstw");

      } else if ("/admin-users" === url) {

        context.dispatch("OPEN_ADMIN_USERS_PAGE", {/* payload */
        });

        return context.getActions("AdminUsersActions").loadList();

      } else if (matchedResult = url.match(/\/admin-users\/(\d+)/)) {
        const adminUserId = matchedResult[1];

        context.dispatch("OPEN_ADMIN_USER_SHOW_PAGE", {/* payload */
          adminUserId,
        });

        return context.getActions("RoutingActions").setPageTitle("Admin User | Reactjstw");

      } else {
        return Promise.reject(404);
      }
    },

    setPageTitle (newPageTitle) {
      context.dispatch("SET_PAGE_TITLE", {/* payload */
        newPageTitle,
      });

      return Promise.resolve(true);
    },

  };
});

export default RoutingActions;
