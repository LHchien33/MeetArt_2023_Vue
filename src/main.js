import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';

import './assets/all.scss';
import * as bootstrap from 'bootstrap';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
