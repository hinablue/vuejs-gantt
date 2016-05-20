<template>
  <section id="vueGanttApp">
    <gantt-side
      :style="sideStyles"
      :size.sync="sideSize"
      :resizer.sync="resizer"></gantt-side>
    <gantt-main
      :style="mainStyles"></gantt-main>
  </section>
</template>

<script>
import moment from 'moment'
import ganttMain from './ganttMain'
import ganttSide from './ganttSide'
import { fetchGanttData } from '../vuex/actions'

// let startTestTask;
// setTimeout(() => {
//   for (var j = 1; j < 6; j++) {
//     startTestTask = moment('2016-01-02 00:00:00');
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
  vuex: {
    actions: {
      fetchGanttData
    }
  },
  components: {
    ganttSide,
    ganttMain
  },
  created () {
    this.fetchGanttData()
  },
  data () {
    return {
      sideStyles: {
        flex: '1 1 30%'
      },
      mainStyles: {
        flex: '1 1 70%'
      },
      sideSize: 500,
      offsetWidth: 0,
      resizer: {
        enable: true
      }
    };
  },
  attached () {
  },
  watch: {
    sideSize (newSize, oldSize) {
      if (newSize !== oldSize) {
        this.sideStyles.flex = '1 1 ' + (newSize / this.$el.offsetWidth) * 100 + '%'
        this.mainStyles.flex = '1 1 ' + (1 - newSize / this.$el.offsetWidth) * 100 + '%'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../node_modules/material-design-lite/material.min.css';

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(../assets/fonts/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
       local('MaterialIcons-Regular'),
       url(../assets/fonts/MaterialIcons-Regular.woff2) format('woff2'),
       url(../assets/fonts/MaterialIcons-Regular.woff) format('woff'),
       url(../assets/fonts/MaterialIcons-Regular.ttf) format('truetype');
}

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
