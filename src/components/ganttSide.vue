<template>
  <div class="gantt-side">
    <gantt-side-header></gantt-side-header>
    <gantt-side-table-tree></gantt-side-table-tree>
    <gantt-side-resizer :size.sync="size" v-if="resizer.enable"></gantt-side-resizer>
  </div>
</template>

<script>
import ganttSideHeader from './ganttSideHeader'
import ganttSideTableTree from './ganttSideTableTree'
import ganttSideResizer from './ganttSideResizer'

export default {
  name: 'ganttSide',
  components: {
    ganttSideHeader,
    ganttSideTableTree,
    ganttSideResizer
  },
  mixins: [
    require ('vue-mixins/onWindowResize')
  ],
  props: {
    resizer: {
      type: Object,
      default: {
        enable: true
      }
    },
    size: {
      type: Number,
      default: 200
    }
  },
  compiled () {
    this.onWindowResize((e) => {
      this.size = this.$el.offsetWidth
      e.preventDefault()
      return true
    })
  },
  attached () {
    this.$nextTick(() => {
      this.size = this.$el.offsetWidth
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-side {
  overflow: hidden
}
</style>
