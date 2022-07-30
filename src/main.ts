import { createApp } from 'vue';
import App from './App.vue';
import Varlet from '@varlet/ui';
import router from './router';
import { createPinia } from 'pinia';
import 'normalize.css';
import '@varlet/ui/es/style.js';
import './style/index.less';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(Varlet);
app.use(pinia);

app.mount('#app');
