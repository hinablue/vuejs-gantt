import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'
import utility from './modules/utility'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions: actions,
  getters: getters,
  modules: {
    utility
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
