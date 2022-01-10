import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Select } from "ant-design-vue";

const app = create(App)

app.use(store).use(router).use(Select).mount("#app");
