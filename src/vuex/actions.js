import ganttData from '../api/ganttData'
import * as types from './mutation-types'

export const setHeaderHeight = ({ commit }, height) => {
  commit(types.SET_HEADER_HEIGHT, height)
}

export const setTableTree = ({ commit }, data) => {
  commit(types.SET_TABLE_TREE, data)
}

export const setTableTreeWidth = ({ commit }, data) => {
  commit(types.SET_TABLE_TREE_NAME_WIDTH, data)
}

export const toggleTableTreeRow = ({ commit }, data) => {
  commit(types.TOGGLE_TABLE_TREE_ROW, data)
}

export const fetchGanttData = ({ commit }) => {
  ganttData.getData((data) => {
    commit(types.SET_GANTT_DATA, data)
  })
}

export const setGanttData = ({ commit }, data) => {
  commit(types.SET_GANTT_DATA, data)
}
