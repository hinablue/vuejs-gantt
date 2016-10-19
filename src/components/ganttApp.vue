<template>
  <section id="vueGanttApp">
    <gantt-side
      v-bind:style="sideStyles"></gantt-side>
    <gantt-main
      v-bind:style="mainStyles"></gantt-main>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ganttMain from './ganttMain.vue'
import ganttSide from './ganttSide.vue'

// let startTestTask
// setTimeout(() => {
//   for (var j = 1; j < 6; j++) {
//     startTestTask = moment('2016-01-02 00:00:00')
//     for (var i = 1; i < 200; i++) {
//       startTestTask = startTestTask.clone().add(2, 'day')
//       data[j].tasks.push({
//         id: 'aGAA'+i+'-'+j,
//         name: 'G'+i+'-'+j,
//         from: startTestTask,
//         to: startTestTask.clone().add(2, 'day')
//       })
//     }
//   }
// }, 500)

export default {
  methods: mapActions({
    fetchGanttData: 'fetchGanttData',
    setTableTreeWidth: 'setTableTreeWidth'
  }),
  components: {
    'gantt-main': ganttMain,
    'gantt-side': ganttSide
  },
  created () {
    this.fetchGanttData()
  },
  computed: mapGetters({
    getTableTreeWidth: 'getTableTreeWidth'
  }),
  data () {
    return {
      sideStyles: {
        flex: '1 1 30%'
      },
      mainStyles: {
        flex: '1 1 70%'
      },
      offsetWidth: 0,
      resizer: {
        enable: true
      }
    }
  },
  watch: {
    getTableTreeWidth (newSize, oldSize) {
      if (newSize !== oldSize) {
        this.sideStyles.flex = '1 1 ' + (newSize / this.$el.offsetWidth) * 100 + '%'
        this.mainStyles.flex = '1 1 ' + (1 - newSize / this.$el.offsetWidth) * 100 + '%'
      }
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html, body {
  font-size: 1rem;
}
#vueGanttApp {
  display: flex;
  flex-direction: row;
  flex-align: start start;
  position: relative;
  border: 0 none;
  overflow: hidden;
  margin: 1rem auto;
  width: 90%;
  padding: 0;
  border: {
    top: 1px solid rgba(0, 0, 0, 0.34);
    left: 1px solid rgba(0, 0, 0, 0.34);
    right: 1px solid rgba(0, 0, 0, 0.34);
  }
  .gantt-side,
  .gantt-main {
    flex: 1 1 30%;
    border: 0 none;
    overflow: hidden;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-align: start start;
  }
  .gantt-main {
    flex: 1 1 70%;
  }
}
</style>
