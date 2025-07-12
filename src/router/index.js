import { createRouter, createWebHistory } from "vue-router";
const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () => import("../views/HomeView.vue"),
  // },
  {
    path: "/",
    name: "firstp",
    component: () => import("../views/FirstP.vue"),
  },
  {
    path: "/pdf",
    name: "PdfViewer",
    component: () => import("../views/PdfV.vue"),
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
