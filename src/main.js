import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import Antd from "ant-design-vue";

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(pinia).use(Antd).mount("#app");
// app.config.compilerOptions.isCustomElement = (tag) => tag === "a-dnd-list";
// app.component("draggable", draggable);
