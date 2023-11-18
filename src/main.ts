import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "../node_modules/bulma/css/bulma.css";

import App from './App.vue'
import router from './router'
import { makeServer } from "../mockServer/server";
// import { ref } from 'vue'
// const themeClass = ref("is-link");

const app = createApp(App)
// provide themeClass globally to all components
// app.provide('themeClass', themeClass);

app.use(createPinia())
app.use(router)
app.use(makeServer)

app.mount('#app')
