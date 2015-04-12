import Goflux from "goflux";
import fetch from "fetch";

const AdminUsersActions = Goflux.defineActions("AdminUsersActions", function (context) {
  return {

    loadList () {

      return fetch("http://localhost:3000/api/admin-users")
      .then((res) => res.json())
      .then((list) => {
        context.dispatch("ADMIN_USERS_LIST_LOADED", {
          list,
        });

        return true;
      });
    }

  };
});

export default AdminUsersActions;
