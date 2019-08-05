import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import base from './modules/base.js'

export default new Vuex.Store({
  strict: true,
  modules: {
    base
  }
})