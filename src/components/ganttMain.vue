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
import moment from 'moment'
import ganttMainHeader from './ganttMainHeader'
import ganttMainContainer from './ganttMainContainer'
import { getGanttData } from '../vuex/getters'

let startFrom = moment()
let endTo = moment()

export default {
  name: 'ganttMain',
  vuex: {
    getters: {
      data: getGanttData
    }
  },
  components: {
    ganttMainHeader,
    ganttMainContainer
  },
  created () {
    let startFrom, endTo
    this.data.forEach((data) => {
      if (data.tasks
        && data.tasks.length > 0)
      {
        data.tasks.forEach((task) => {
          startFrom = moment.min(startFrom, task.from.clone())
          endTo = moment.max(endTo, task.to.clone())
        })
      }
    })

    startFrom = startFrom.startOf('month')
    endTo = endTo.endOf('week')

    this.yearMonth = []
    let startOfDate = startFrom.clone()
    while (startOfDate.format('X') < endTo.format('X')) {
      this.yearMonth.push(startOfDate)
      startOfDate = startOfDate.clone().add(1, 'month')
    }
    this.yearWeeks = []
    startOfDate = startFrom.clone()
    while (startOfDate.format('X') < endTo.format('X')) {
      this.yearWeeks.push(startOfDate.week())
      startOfDate = startOfDate.clone().add(1, 'week')
    }

    this.yearDays = []
    startOfDate = startFrom.clone();
    while (startOfDate.format('X') < endTo.format('X')) {
      this.yearDays.push(startOfDate.format('D'))
      startOfDate = startOfDate.clone().add(1, 'day')
    }

    this.mainStyle.width = this.yearDays.length * 2 + 'rem'
  },
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      mainStyle: {
        width: 'auto'
      },
      yearMonth: [],
      yearWeeks: [],
      yearDays: []
    };
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
