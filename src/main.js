import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('setWH',(url,arg)=>{
	return url.replace(/w\.h/,arg)
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

import Loading from '@/components/LoadingCircle'
Vue.component('Loading',Loading)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
