import { createApp } from 'vue';
import App from './App.vue';
import i18n from './lang/index.js';
import './assets/bootstrap.min.css';

createApp(App).use(i18n).mount('#app')
