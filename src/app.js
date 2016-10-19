import Vue from 'vue'
import ganttApp from './components/ganttApp'
import store from './vuex/store'

new Vue({
  store: store,
  render: h => h(ganttApp)
}).$mount('#app')
