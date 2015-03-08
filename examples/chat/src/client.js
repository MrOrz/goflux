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

const context = goflux.createContext();

React.render(
  <ChatApp gofluxContext={context} />,
  document.getElementById("goflux"),
  () => {
    ChatWebAPIUtils.getAllMessages().then((rawMessages) => {
      return context.getActions("ServerActions").receiveAll(rawMessages);
    });
  }
);
