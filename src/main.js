import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VuePdfjs from "vue3-pdfjs";
const app = createApp(App);
app.use(VuePdfjs);
app.use(router);
console.log(app._context?.components); // هنا تتأكد فعلاً
app.mount("#app");
