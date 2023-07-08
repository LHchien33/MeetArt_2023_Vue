import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import { configure, defineRule } from 'vee-validate';
import { required, email, url, min_value, regex } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import './assets/all.scss';
import * as bootstrap from 'bootstrap';

configure({
  validateOnChange: false,
  generateMessage: localize('zh_TW',{
    messages: {
      ...zh_TW.messages
    }
  }),
});
setLocale('zh_TW');

defineRule('required', required);
defineRule('email', email);
defineRule('url', url);
defineRule('min_value', min_value);
defineRule('regex', regex);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
