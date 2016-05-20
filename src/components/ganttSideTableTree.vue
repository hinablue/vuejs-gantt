<template>
  <div class="gantt-side-table-tree">
    <gantt-side-table-tree-item
      class="item"
      v-for="model in treeData"
      track-by="$index"
      :model.sync="model">
    </gantt-side-table-tree-item>
  </div>
</template>

<script>
import moment from 'moment'
import ganttSideTableTreeItem from './ganttSideTableTreeItem'
import { setTableTree } from '../vuex/actions'
import { getGanttData } from '../vuex/getters'

export default {
  name: 'ganttSideTableTree',
  vuex: {
    getters: {
      data: getGanttData
    },
    actions: {
      setTableTree
    }
  },
  created () {
    let treeData = { children: [] }
    let childrenCollection = []
    let rowDatetimeRange = {
      from: '',
      to: ''
    }
    let getRowDateRange = (tasks) => {
      let rowStartFrom = moment().add(9999, 'year')
      let rowEndTo = moment().subtract(9999, 'year')
      tasks.forEach((task) => {
        rowStartFrom = moment.min(rowStartFrom, task.from.clone())
        rowEndTo = moment.max(rowEndTo, task.to.clone())
      })
      return {
        from: rowStartFrom,
        to: rowEndTo
      }
    }

    this.data.forEach((data) => {
      if (data.children
          && data.children.length > 0)
      {
        childrenCollection = childrenCollection.concat(data.children)
        data.children.forEach((child) => {
          let __index = this.data.findIndex((d) => {
            return d.id === child
          })
          if (__index > -1) {
            if (treeData.id === this.data[__index].id) {
              treeData = Object.assign({}, {
                id: data.id,
                name: data.name,
                children: [treeData]
              })
            } else {
              treeData = Object.assign({}, treeData, {
                id: data.id,
                name: data.name
              })

              treeData.children.push({
                id: this.data[__index].id,
                name: this.data[__index].name,
                children: []
              })
            }
          }
        })
      }
    });

    if (treeData.length > 0) {
      treeData = [treeData];
    } else {
      treeData = [];
    }

    this.data.forEach((data) => {
      if (childrenCollection.indexOf(data.id) === -1
        && data.children.length === 0) {
        treeData.push({
          id: data.id,
          name: data.name,
          children: []
        })
      }
    })

    this.setTableTree(treeData)

    this.$nextTick(() => {
      this.treeData = treeData
    })
  },
  components: {
    ganttSideTableTreeItem
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
