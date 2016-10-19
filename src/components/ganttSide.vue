<template>
  <div class="gantt-side">
    <gantt-side-header></gantt-side-header>
    <gantt-side-table-tree></gantt-side-table-tree>
    <gantt-side-resizer></gantt-side-resizer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ganttSideHeader from './ganttSideHeader.vue'
import ganttSideTableTree from './ganttSideTableTree.vue'
import ganttSideResizer from './ganttSideResizer.vue'

export default {
  name: 'ganttSide',
  components: {
    'gantt-side-header': ganttSideHeader,
    'gantt-side-table-tree': ganttSideTableTree,
    'gantt-side-resizer': ganttSideResizer
  },
  mixins: [
    require('vue-mixins/onWindowResize')
  ],
  computed: mapGetters({
    getTableTreeWidth: 'getTableTreeWidth'
  }),
  methods: mapActions({
    setTableTreeWidth: 'setTableTreeWidth'
  }),
  mounted () {
    this.onWindowResize((e) => {
      this.setTableTreeWidth(this.$el.offsetWidth)
      e.preventDefault()
      return true
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
