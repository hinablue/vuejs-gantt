<template>
  <section class="gantt-main-container-columns">
    <div class="date day"
        v-for="day in yearDays" track-by="$index"></div>
  </section>
</template>

<script>
import {
  getGanttData,
  getToggledTableTreeRow
} from '../vuex/getters'

export default {
  name: 'ganttMainContainerColumns',
  vuex: {
    getters: {
      data: getGanttData,
      toggleRow: getToggledTableTreeRow
    }
  },
  props: {
    yearDays: {
      type: Array
    }
  },
  methods: {
    toggleRowsFromTreeItem (data) {
      let reduce = [data.id]
      if (data.children && data.children.length > 0) {
        data.children.forEach((treeRow) => {
          reduce = reduce.concat(this.toggleRowsFromTreeItem(treeRow))
        })
      }
      return reduce
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.gantt-main-container-columns {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  height: 100%;
  .date {
    flex: 0 1 auto;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, 0.34);
    padding: 0.3rem 0;
    height: 100%;
    &.day {
      width: 2rem;
    }
  }
}
</style>