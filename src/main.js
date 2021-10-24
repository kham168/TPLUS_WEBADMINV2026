import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "../src/assets/scss/main.scss";
import i18n from './i18n'
import validate from "./Validation/validate"

Vue.config.productionTip = false
Vue.prototype.$myValidator = validate;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
