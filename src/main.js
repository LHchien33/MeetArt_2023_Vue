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

import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import 'sweetalert2/dist/sweetalert2.min.css';
import customToast from './plugins/GlobalToast';

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
defineRule('phoneNumber', (value) => {
  const format = /^(?!.*--)[0-9-]+$/;
  if(!format.test(value)){
    return '僅接受數字及不連續的連字號（-）';
  }
  
  const number = value.split('').filter(num => num !== '-')
  if(number.length < 9 || 10 < number.length){
    return '號碼長度需介於 9 ~ 10 碼';
  }

  const startNum = /^(0)[2-9]{1}/;
  if(!startNum.test(value)){
    return  '請確認號碼開頭介於 02 ~ 09';
  }

  return true
});
defineRule('wordLimit',(value, [max, target]) => {
  let totalCharCount = value.match(/(?:[a-zA-Z]+|\S)/g).length || 0;

  if (totalCharCount > max) {
    return `請精簡 ${target} 內容（目前約 ${totalCharCount} 個字）`
  }
  
  return true
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin, {
  zIndex: 1059,
  color: '#fff',
  backgroundColor: '#999',
})
app.use(customToast);

app.mount('#app');
