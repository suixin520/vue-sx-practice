import Vue from 'vue'
import Vuex from 'vuex'
import states from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import CreateLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  states,
  mutations,
  getters,
  actions,
  strcit: debug,
  plugins: debug ? [CreateLogger()] : []
})
