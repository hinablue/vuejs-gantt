import {
  SET_GANTT_DATA,
  SET_HEADER_HEIGHT,
  SET_TABLE_TREE,
  TOGGLE_TABLE_TREE_ROW,
  SET_TABLE_TREE_NAME_WIDTH
} from '../mutation-types'

const state = {
  data: [],
  tableTree: {},
  toggleTableTreeRow: {},
  headerHeight: 0
}

const mutations = {
  [SET_GANTT_DATA] (state, data) {
    state.data = data
  },

  [SET_HEADER_HEIGHT] (state, height) {
    state.headerHeight = height
  },

  [SET_TABLE_TREE] (state, data) {
    state.tableTree = data
  },

  [TOGGLE_TABLE_TREE_ROW] (state, data) {
    state.toggleTableTreeRow = data
  }
}

export default {
  state,
  mutations
}