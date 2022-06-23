import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import store from './store'
import router from './router'


Vue.use(VueMaterial)
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  mounted() {},
  store,
  router,

  components: {
    App,
  }
})

;