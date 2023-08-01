import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './style/index.css'
import App from './App.vue'
import router from "./router/index";
import store from "./store";
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import VueCookies from 'vue3-cookies';
import VueClipboard from 'vue3-clipboard';
import CKEditor from '@ckeditor/ckeditor5-vue';
const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
});
app.use(VueCookies);
app.use(VueSplide);
app.use(CKEditor);
app.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyAog3Tamm1l2ni9uEr_mrjOzcIOX0763kU",
        libraries: "places"
    },
});
app.mount('#app');