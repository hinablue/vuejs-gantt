import Vue from 'vue'
import ganttApp from './components/ganttApp'
import store from './vuex/store'

require ('../node_modules/material-design-lite/material.min')

let vue = new Vue({
  el: 'body',
  store,
  components: {
  	app: ganttApp
  }
});
