import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
