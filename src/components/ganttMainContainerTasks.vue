<template>
  <div class="gantt-main-container-tasks">
    <div class="gantt-row"
      v-for="row in rows"
      v-show="row.display">
      <div class="gantt-task"
        :style="setTaskStyles(task)"
        v-for="task in row.tasks">{{ task.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  format,
  min,
  startOfDay,
  addYears
} from 'date-fns'

export default {
  name: 'ganttMainContainerTasks',
  computed: mapGetters({
    ganttData: 'getGanttData',
    tableTree: 'getTableTree',
    toggleRow: 'getToggledTableTreeRow'
  }),
  created () {
    this.rows = []
    this.generateRowsFromTreeTable(this.tableTree)
  },
  methods: {
    generateRowsFromTreeTable (data) {
      data.forEach((row) => {
        let __index = this.ganttData.findIndex((__row) => {
          return __row.id === row.id
        })

        if (__index > -1) {
          this.rows.push(Object.assign({}, row, {
            display: true,
            tasks: this.ganttData[__index].tasks.map((task) => {
              this.startFrom = min(this.startFrom, startOfDay(task.from))
              return Object.assign({}, task, {
                color: task.color ? task.color : 'rgba(255, 150, 95, 0.75)'
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
        backgroundColor: task.color ? task.color : 'rgba(255, 150, 95, 0.75)'
      }
    },
    getPositionFromDate (date) {
      return Math.round(
        (format(date, 'X') - format(this.startFrom, 'X')) / 3600 * (2 * 16 / 24)
      )
    },
    getWidthFromDate (from, to) {
      return Math.round(
        Math.abs(
          Math.ceil((format(from, 'X') - format(to, 'X')) / 3600) * (2 * 16 / 24)
        )
      )
    }
  },
  data () {
    return {
      startFrom: addYears(new Date(), 999),
      rows: [],
      loggedEvent: ''
    }
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
          if (toggleRows.indexOf(row.id) > -1 &&
            row.display !== !!data.open
          ) {
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
  .gantt-row {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    overflow: hidden;
    .gantt-task {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.3rem 0;
      background-color: rgba(255, 150, 95, 0.75);
      overflow: hidden;
    }
  }
}
</style>