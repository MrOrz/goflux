import React from "react";

import goflux from "./goflux";
import IsomorphicApp from "./components/IsomorphicApp.react";

const context = goflux.createContext().rehydrate(window.IsomorphicApp);

/*
 * Notice: You have to pass persistedState into IsomorphicApp component, since
 *  React require you to pass the same props into the component for server-side
 *  rendering. The check is enforced by checksum.
 */
React.render(
  <IsomorphicApp gofluxContext={context}
                  persistedState={JSON.stringify(window.IsomorphicApp)}
                  persistedNamespace="IsomorphicApp" />
, document
);
