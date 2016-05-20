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
          rowDatetimeRange = {
            from: '',
            to: ''
          }

          let __index = this.data.findIndex((d) => {
            return d.id === child
          })
          if (__index > -1) {
            if (treeData.id === this.data[__index].id) {
              if (this.data[__index].tasks
                && this.data[__index].tasks.length > 0)
              {
                rowDatetimeRange = getRowDateRange(this.data[__index].tasks)
              }
              treeData = Object.assign({}, {
                id: data.id,
                name: data.name,
                from: rowDatetimeRange.from,
                to: rowDatetimeRange.to,
                children: [treeData]
              })
            } else {
              if (data.tasks
                && data.tasks.length > 0)
              {
                rowDatetimeRange = getRowDateRange(data.tasks)
              }
              treeData = Object.assign({}, treeData, {
                id: data.id,
                name: data.name,
                from: rowDatetimeRange.from,
                to: rowDatetimeRange.to
              })

              rowDatetimeRange = {
                from: '',
                to: ''
              }
              if (this.data[__index].tasks
                && this.data[__index].tasks.length > 0)
              {
                rowDatetimeRange = getRowDateRange(this.data[__index].tasks)
              }
              treeData.children.push({
                id: this.data[__index].id,
                name: this.data[__index].name,
                from: rowDatetimeRange.from,
                to: rowDatetimeRange.to,
                children: []
              })
            }
          }
        })
      }
    });

    treeData = [treeData];

    this.data.forEach((data) => {
      if (childrenCollection.indexOf(data.id) === -1
        && data.children.length === 0) {
        rowDatetimeRange = {
          from: '',
          to: ''
        }
        if (data.tasks
          && data.tasks.length > 0)
        {
          rowDatetimeRange = getRowDateRange(data.tasks)
        }
        treeData.push({
          id: data.id,
          name: data.name,
          from: rowDatetimeRange.from,
          to: rowDatetimeRange.to,
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
