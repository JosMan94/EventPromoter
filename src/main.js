import { createApp } from 'vue'
import './style/index.css'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import VueCookies from 'vue3-cookies';
import VueClipboard from 'vue3-clipboard'
const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
});
app.use(VueCookies);
app.use(VueSplide);
app.mount('#app');