import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import { configure } from 'vee-validate';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import './assets/all.scss';
import * as bootstrap from 'bootstrap';

configure({
  generateMessage: localize('zh_TW',{
    messages: {
      ...zh_TW.messages
    }
  }),
});
setLocale('zh_TW');

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
