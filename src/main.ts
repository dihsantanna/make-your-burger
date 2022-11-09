import { createApp } from 'vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import { router } from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
