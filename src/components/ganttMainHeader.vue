<template>
  <section class="gantt-main-header">
    <section class="date-header">
      <div class="date year"
        :style="yearMonthStyle(year)"
        v-for="year in yearMonth"
        track-by="$index">{{ year.format('MMM YYYY') }}</div>
    </section>
    <section class="date-header">
      <div class="date week"
        v-for="week in yearWeeks"
        track-by="$index">{{ week }}</div>
    </section>
    <section class="date-header">
      <div class="date day"
        v-for="day in yearDays"
        track-by="$index">{{ day }}</div>
    </section>
  </section>
</template>

<script>
import moment from 'moment'
import { setHeaderHeight } from '../vuex/actions'

export default {
  name: 'ganttMainHeader',
  vuex: {
    actions: {
      setHeaderHeight
    }
  },
  props: {
    yearMonth: {
      type: Array
    },
    yearWeeks: {
      type: Array
    },
    yearDays: {
      type: Array
    }
  },
  methods: {
    yearMonthStyle (date) {
      let __date = parseInt(date.endOf('month').format('D'), 10);
      return { width: __date * 2 + 'rem' };
    }
  },
  attached () {
    this.$nextTick(() => {
      this.setHeaderHeight(this.$el.offsetHeight)
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-main-header {
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  .date-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
    border-bottom: 1px solid rgba(0, 0, 0, 0.34);
    .date {
      flex: 0 1 auto;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.34);
      padding: 0.3rem 0;
      &.week {
        width: 14rem;
      }
      &.day {
        width: 2rem;
      }
    }
  }
}
</style>
