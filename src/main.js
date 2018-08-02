// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview'
import App from './App';
import router from './router';
import http from '@/plugins/http';
import filters from '@/filters';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.prototype.$http = http;

/* eslint-disable no-new */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(iView)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
