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
    alert("Different routes changes the document title");
    context.getActions("RoutingActions").route(location.pathname);
    alert("Did you see the difference?");
  }
);
