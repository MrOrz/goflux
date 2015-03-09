/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUny
 */
import React from "react/addons";

import ChatWebAPIUtils from "./utils/ChatWebAPIUtils";

import goflux from "./goflux";
import ChatApp from "./components/ChatApp.react";

require("./client.css");
ChatWebAPIUtils.clearLocalStorage();

const context = goflux.createContext();

React.render(
  <ChatApp gofluxContext={context} />,
  document.getElementById("goflux"),
  () => {
    context.getActions("RoutingActions").route(location.pathname);
  }
);
