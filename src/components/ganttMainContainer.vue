<template>
  <div class="gantt-main-container">
    <gantt-main-container-columns
      :year-days="yearDays"></gantt-main-container-columns>
    <gantt-main-container-rows></gantt-main-container-rows>
    <gantt-main-container-tasks></gantt-main-container-tasks>
  </div>
</template>

<script>
import ganttMainContainerColumns from './ganttMainContainerColumns.vue'
import ganttMainContainerRows from './ganttMainContainerRows.vue'
import ganttMainContainerTasks from './ganttMainContainerTasks.vue'

export default {
  name: 'ganttMainContainer',
  components: {
    'gantt-main-container-columns': ganttMainContainerColumns,
    'gantt-main-container-rows': ganttMainContainerRows,
    'gantt-main-container-tasks': ganttMainContainerTasks
  },
  props: {
    yearDays: {
      type: Array
    }
  },
  data () {
    return {}
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
