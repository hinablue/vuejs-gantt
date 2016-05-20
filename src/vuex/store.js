import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

import utility from './modules/utility'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    utility
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
