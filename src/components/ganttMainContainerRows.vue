<template>
  <div class="gantt-main-container-rows">
    <div class="row"
      v-for="row in rows"
      v-show="row.display"
      track-by="$index"></div>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getTableTree,
  getToggledTableTreeRow
} from '../vuex/getters'

export default {
  name: 'ganttMainContainerRows',
  vuex: {
    getters: {
      tableTree: getTableTree,
      toggleRow: getToggledTableTreeRow
    }
  },
  created () {
    this.rows = []
    this.generateRowsFromTreeTable(this.tableTree)
  },
  methods: {
    toggleRowsFromTreeItem (data, isOpen) {
      if (data.children && data.children.length > 0) {
        data.children.forEach((treeRow) => {
          let __index = this.rows.findIndex((row) => {
            return row.id === treeRow.id
          })

          if (__index > -1 && this.rows[__index].display !== !!isOpen) {
            this.rows[__index].display = !!isOpen
          }

          this.toggleRowsFromTreeItem(treeRow, isOpen)
        })
      }
    },
    generateRowsFromTreeTable (data) {
      data.forEach((row) => {
        this.rows.push(Object.assign({}, row, {
          display: true
        }))
        if (row.children && row.children.length > 0) {
          this.generateRowsFromTreeTable(row.children)
        }
      })
    }
  },
  data () {
    return {
      rows: []
    };
  },
  watch: {
    toggleRow (data) {
      if (data.model.children && data.model.children.length > 0) {
        this.$nextTick(() => {
          this.toggleRowsFromTreeItem(data.model, data.open)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gantt-main-container-rows {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .row {
    display: block;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.34);
    background-color: rgba(255, 180, 99, 0.34);
  }
}
</style>