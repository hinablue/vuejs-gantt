<template>
  <div class="gantt-side-header" :style="headerStyle">
    <div class="head name">{{ rowName }}</div>
  </div>
</template>

<script>
import { getHeaderHeight } from '../vuex/getters'

export default {
  name: 'ganttSideHeader',
  vuex: {
    getters: {
      headerHeight: getHeaderHeight
    }
  },
  data () {
    return {
      headerStyle: {
        height: '0px'
      }
    }
  },
  computed: {
    rowName () {
      return 'Name'
    }
  },
  attached () {
    this.$nextTick(() => {
      this.headerStyle.height = this.headerHeight + 'px'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-side-header {
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  align-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.34);
  .head {
    flex: 0 1 auto;
    &.name {
      min-width: 200px;
    }
    &.start-from,
    &.end-to {
      min-width: 12rem;
    }
  }
}
</style>
