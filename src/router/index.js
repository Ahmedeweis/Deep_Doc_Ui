import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  //   {
  //     path: "/upload",
  //     name: "Upload",
  //     component: () => import("../views/UploadView.vue"),
  //   },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
