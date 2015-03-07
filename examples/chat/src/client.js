/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUny
 */
import React from "react/addons";

import goflux from "./goflux";
import ChatApp from "./components/ChatApp.react";

React.render(
  <ChatApp gofluxContext={goflux.createContext()} />,
  document.getElementById("goflux")
);
