import Vue from 'vue'
import ActionCableVue from 'actioncable-vue';
// import App from './App.vue'
import Chat from './Chat.vue'

Vue.config.productionTip = false
Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://api-rails-chat.herokuapp.com/cable',
  connectImmediately: true,
});

new Vue({
  render: h => h(Chat),
}).$mount('#app')
