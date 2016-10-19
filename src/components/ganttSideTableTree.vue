<template>
  <div class="gantt-side-table-tree">
    <gantt-side-table-tree-item
      class="item"
      v-for="model in treeData"
      :model="model">
    </gantt-side-table-tree-item>
  </div>
</template>

<script>
// import { parse, addYears, subYears, min, max } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
import ganttSideTableTreeItem from './ganttSideTableTreeItem.vue'

export default {
  name: 'ganttSideTableTree',
  components: {
    'gantt-side-table-tree-item': ganttSideTableTreeItem
  },
  computed: mapGetters({
    ganttData: 'getGanttData'
  }),
  methods: mapActions({
    setTableTree: 'setTableTree',
    setGanttData: 'setGanttData'
  }),
  created () {
    let treeData = { children: [] }
    let childrenCollection = []
    // let today = new Date()
    // let getRowDateRange = (tasks) => {
    //   let rowStartFrom = addYears(today, 999)
    //   let rowEndTo = subYears(today, 999)
    //   tasks.forEach((task) => {
    //     rowStartFrom = min(rowStartFrom, parse(task.from))
    //     rowEndTo = max(rowEndTo, parse(task.to))
    //   })
    //   return {
    //     from: rowStartFrom,
    //     to: rowEndTo
    //   }
    // }

    this.ganttData.forEach((data) => {
      if (typeof data.children !== 'undefined' &&
          Array.isArray(data.children) &&
          data.children.length > 0
      ) {
        childrenCollection = childrenCollection.concat(data.children)
        data.children.forEach((child) => {
          let __index = this.ganttData.findIndex((d) => {
            return d.id === child
          })
          if (__index > -1) {
            if (treeData.id === this.ganttData[__index].id) {
              treeData = Object.assign({}, {
                id: data.id,
                name: data.name,
                children: [treeData]
              })
            } else {
              treeData = Object.assign({}, treeData, {
                id: data.id,
                name: data.name,
                children: []
              })

              treeData.children.push({
                id: this.ganttData[__index].id,
                name: this.ganttData[__index].name,
                children: []
              })
            }
          }
        })
      }
    })

    if (typeof treeData.id !== 'undefined') {
      treeData = [treeData]
    } else {
      treeData = []
    }

    this.ganttData.forEach((data) => {
      if (childrenCollection.indexOf(data.id) === -1 &&
        data.children.length === 0
      ) {
        treeData.push({
          id: data.id,
          name: data.name,
          children: []
        })
      }
    })

    this.setTableTree(treeData)

    this.$nextTick(() => {
      this.setGanttData(treeData)
      this.treeData = treeData
    })
  },
  data () {
    return {
      treeData: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-side-table-tree {
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>
