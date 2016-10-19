<template>
  <div class="gantt-side-header" v-bind:style="headerStyle">
    <div class="head name">{{ rowName }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ganttSideHeader',
  data () {
    return {
      headerStyle: {
        height: '0px'
      }
    }
  },
  computed: Object.assign(
    mapGetters({
      headerHeight: 'getHeaderHeight'
    }),
    {
      rowName () {
        return 'Name'
      }
    }
  ),
  methods: mapActions({
    setTableTreeWidth: 'setTableTreeWidth'
  }),
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.headerStyle.height = this.headerHeight + 'px'
        this.setTableTreeWidth(this.$el.offsetWidth)
      }, 10)
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
