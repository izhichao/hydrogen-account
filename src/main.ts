import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import Varlet from '@varlet/ui';
import router from './router';
const app = createApp(App);

app.use(router);
app.use(Varlet);

app.mount('#app');
