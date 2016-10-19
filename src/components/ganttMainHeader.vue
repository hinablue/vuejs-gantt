<template>
  <section class="gantt-main-header">
    <section class="date-header">
      <div class="date year"
        :style="yearMonthStyle(year)"
        v-for="(year, index) in yearMonth">
        <span>{{ computedYear(year) }}</span>
      </div>
    </section>
    <section class="date-header">
      <div class="date week"
        v-for="(week, index) in yearWeeks">
        <span>{{ week }}</span>
      </div>
    </section>
    <section class="date-header">
      <div class="date day"
        v-for="(day, index) in yearDays">
        <span>{{ day }}</span>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { format, endOfMonth } from 'date-fns'

export default {
  name: 'ganttMainHeader',
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
  methods: Object.assign(
    mapActions({
      setHeaderHeight: 'setHeaderHeight'
    }),
    {
      yearMonthStyle (date) {
        let __date = parseInt(format(endOfMonth(date), 'D'), 10)
        return { width: __date * 2 + 'rem' }
      },
      computedYear (year) {
        return format(year, 'MMM D, YYYY')
      }
    }
  ),
  mounted () {
    this.$nextTick(() => {
      this.setHeaderHeight(this.$el.offsetHeight)
    })
  }
}
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
