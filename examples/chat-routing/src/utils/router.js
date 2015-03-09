import Router from "routr";

const router = new Router({
  list_threads_page: {
    path: "/",
  },

  show_thread_page: {
    path: "/threads/:threadId",
    method: "get",
  }
});

export default router;
