<template>
  <div class="gantt-main-container-tasks">
    <div class="row"
      v-for="row in rows"
      v-show="row.display"
      track-by="$index">
      <div class="task"
        :style="setTaskStyles(task)"
        v-for="task in row.tasks"
        track-by="$index">{{ task.name }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getGanttData,
  getTableTree,
  getToggledTableTreeRow
} from '../vuex/getters'

export default {
  name: 'ganttMainContainerTasks',
  vuex: {
    getters: {
      data: getGanttData,
      tableTree: getTableTree,
      toggleRow: getToggledTableTreeRow
    }
  },
  created () {
    this.rows = []
    this.generateRowsFromTreeTable(this.tableTree)
  },
  methods: {
    generateRowsFromTreeTable (data) {
      data.forEach((row) => {
        let __index = this.data.findIndex((__row) => {
          return __row.id === row.id
        })

        if (__index > -1) {
          this.rows.push(Object.assign({}, row, {
            display: true,
            tasks: this.data[__index].tasks.map((task) => {
              this.startFrom = moment.min(this.startFrom, task.from.clone().startOf('day'))
              return Object.assign({}, task, {
                color: task.color ? task.color : 'rgb(255, 150, 95)'
              })
            })
          }))
        }
        if (row.children && row.children.length > 0) {
          this.generateRowsFromTreeTable(row.children)
        }
      })
    },
    toggleRowsFromTreeItem (data) {
      let reduce = [data.id]
      if (data.children && data.children.length > 0) {
        data.children.forEach((treeRow) => {
          reduce = reduce.concat(this.toggleRowsFromTreeItem(treeRow))
        })
      }
      return reduce
    },
    setTaskStyles (task) {
      return {
        left: this.getPositionFromDate(task.from) + 'px',
        width: this.getWidthFromDate(task.from, task.to) + 'px',
        backgroundColor: task.color ? task.color : 'rgb(255, 150, 95)'
      }
    },
    getPositionFromDate (date) {
      return Math.round(
        (date.format('X') - this.startFrom.format('X')) / 3600 * (2 * 16 / 24)
      )
    },
    getWidthFromDate (from, to) {
      return Math.round(
        Math.abs(
          Math.ceil((from.format('X') - to.format('X')) / 3600) * (2 * 16 / 24)
        )
      )
    }
  },
  data () {
    return {
      startFrom: moment().add(9999, 'year'),
      rows: [],
      loggedEvent: ''
    };
  },
  watch: {
    tableTree (data) {
      this.rows = []
      this.generateRowsFromTreeTable(data)
    },
    toggleRow (data) {
      let toggleRows = this.toggleRowsFromTreeItem(data.model)
      toggleRows.shift()

      this.$nextTick(() => {
        this.rows.forEach((row) => {
          if (toggleRows.indexOf(row.id) > -1
            && row.display !== !!data.open)
          {
            row.display = !!data.open
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.gantt-main-container-tasks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .row {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    overflow: hidden;
    .task {
      position: absolute;
      top: 1px;
      left: 0;
      padding: 0.3rem 0;
      background-color: rgb(255, 150, 95);
      overflow: hidden;
    }
  }
}
</style>