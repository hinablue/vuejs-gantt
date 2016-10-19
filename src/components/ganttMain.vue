<template>
  <div class="gantt-main">
    <div class="gantt-main-scroller" :style="mainStyle">
      <gantt-main-header
        :year-month="yearMonth"
        :year-weeks="yearWeeks"
        :year-days="yearDays"></gantt-main-header>
      <gantt-main-container
        :year-days="yearDays"></gantt-main-container>
    </div>
  </div>
</template>

<script>
import {
  // parse,
  min,
  max,
  isBefore,
  format,
  addMonths,
  addWeeks,
  addDays,
  getISOWeeksInYear,
  startOfMonth,
  endOfWeek
} from 'date-fns'

import ganttMainHeader from './ganttMainHeader'
import ganttMainContainer from './ganttMainContainer'
import { mapGetters } from 'vuex'

let startFrom = new Date()
let endTo = new Date()

export default {
  name: 'ganttMain',
  computed: mapGetters({
    ganttData: 'getGanttData'
  }),
  components: {
    'gantt-main-header': ganttMainHeader,
    'gantt-main-container': ganttMainContainer
  },
  created () {
    this.ganttData.forEach((data) => {
      if (data.tasks &&
        data.tasks.length > 0
      ) {
        data.tasks.forEach((task) => {
          startFrom = min(startFrom, task.from)
          endTo = max(endTo, task.to)
        })
      }
    })

    startFrom = startOfMonth(startFrom)
    endTo = endOfWeek(endTo)

    this.yearMonth = []
    let startOfDate = startOfMonth(startFrom)
    while (isBefore(startOfDate, endTo)) {
      this.yearMonth.push(startOfDate)
      startOfDate = addMonths(startOfDate, 1)
    }
    this.yearWeeks = []
    startOfDate = startOfMonth(startFrom)
    while (isBefore(startOfDate, endTo)) {
      this.yearWeeks.push(getISOWeeksInYear(startOfDate))
      startOfDate = addWeeks(startOfDate, 1)
    }
    this.yearDays = []
    startOfDate = startOfMonth(startFrom)
    while (isBefore(startOfDate, endTo)) {
      this.yearDays.push(format(startOfDate, 'D'))
      startOfDate = addDays(startOfDate, 1)
    }

    this.mainStyle.width = this.yearDays.length * 2 + 'rem'
  },
  data () {
    return {
      mainStyle: {
        width: 'auto'
      },
      yearMonth: [],
      yearWeeks: [],
      yearDays: []
    }
  },
  watch: {
    height (height) {
      this.$nextTick(() => {
        this.mainStyle.height = this.height + 'px'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#vueGanttApp {
  .gantt-main {
    overflow: auto;
    width: 100%;
    .gantt-main-scroller {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>
