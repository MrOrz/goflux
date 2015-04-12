/*
 * Referral implementations:
 *
 * @fluxible: http://git.io/pUnC
 */
import {Goflux} from "goflux";

const goflux = new Goflux();

goflux.defineActions("MessageActions", require("./actions/MessageActions"));
goflux.defineActions("ServerActions", require("./actions/ServerActions"));
goflux.defineActions("ThreadActions", require("./actions/ThreadActions"));
goflux.defineActions("RoutingActions", require("./actions/RoutingActions"));

goflux.defineStore("MessageStore", {
  /*
   * Mapping for ACTION_NAME to handler name for MessageStore instance.
   */
  "CLICK_THREAD": "_click_thread_",
  "CREATE_MESSAGE": "_create_message_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
},
  require("./stores/MessageStore")
);

goflux.defineStore("RoutingStore", {
  /*
   * Mapping for ACTION_NAME to handler name for RoutingStore instance.
   */
  "OPEN_THREAD_INDEX_PAGE": "_open_thread_index_page_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
  "OPEN_THREAD_SHOW_PAGE": "_open_thread_show_page_",
  "CLICK_THREAD": "_click_thread_",
},
  require("./stores/RoutingStore")
);

goflux.defineStore("ThreadStore", {
  /*
   * Mapping for ACTION_NAME to handler name for ThreadStore instance.
   */
  "CLICK_THREAD": "_click_thread_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
},
  require("./stores/ThreadStore")
);

goflux.defineStore("UnreadThreadStore", {
  /*
   * Mapping for ACTION_NAME to handler name for UnreadThreadStore instance.
   */
  "CLICK_THREAD": "_click_thread_",
  "RECEIVE_RAW_MESSAGES": "_receive_raw_messages_",
},
  require("./stores/UnreadThreadStore")
);

export default goflux;
