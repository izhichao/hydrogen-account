import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@varlet/ui/es/snackbar/style/index.js';
import '@varlet/ui/es/dialog/style/index.js';
import 'normalize.css';
import './style/index.less';
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);

app.mount('#app');
