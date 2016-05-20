<template>
  <div class="gantt-main-container">
    <gantt-main-container-columns
      :year-days="yearDays"></gantt-main-container-columns>
    <gantt-main-container-rows></gantt-main-container-rows>
    <gantt-main-container-tasks></gantt-main-container-tasks>
  </div>
</template>

<script>
import ganttMainContainerRows from './ganttMainContainerRows'
import ganttMainContainerColumns from './ganttMainContainerColumns'
import ganttMainContainerTasks from './ganttMainContainerTasks'

export default {
  name: 'ganttMainContainer',
  components: {
    ganttMainContainerRows,
    ganttMainContainerColumns,
    ganttMainContainerTasks
  },
  props: {
    yearDays: {
      type: Array
    }
  },
  data () {
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-main-container {
  position: relative;
  overflow: hidden;
  height: 100%;
}
</style>
