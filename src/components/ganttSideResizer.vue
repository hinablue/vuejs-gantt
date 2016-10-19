<template>
  <div class="gantt-side-resizer"
    v-bind:style="styles"
    @mousedown.prevent="dragStart"
    @touchstart.prevent="dragStart"
    @dblclick.prevent="dragStart">
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ganttSideResizer',
  mixins: [
    require('vue-mixins/onceDocument'),
    require('vue-mixins/onDocument')
  ],
  data () {
    return {
      startPos: 0,
      startSize: 0,
      minSize: 200,
      removeMoveListener: null,
      removeEndListener: null,
      width: this.getTableTreeWidth,
      styles: {
        left: '0px'
      }
    }
  },
  computed: mapGetters({
    getTableTreeWidth: 'getTableTreeWidth'
  }),
  methods: Object.assign(
    mapActions({
      setTableTreeWidth: 'setTableTreeWidth'
    }),
    {
      dragStart (e) {
        this.startSize = this.getTableTreeWidth
        this.startPos = e.clientX

        this.removeMoveListener = this.onDocument(
          'mousemove',
          this.drag
        )
        this.removeEndListener = this.onceDocument(
          'mouseup',
          this.dragEnd
        )
      },
      drag (e) {
        this.width = this.startSize + (e.clientX - this.startPos)
        this.styles.left = (this.width - this.$el.offsetWidth) + 'px'
        e.preventDefault()
      },
      dragEnd (e) {
        this.removeMoveListener()
        this.removeEndListener()
        this.setTableTreeWidth(this.width)
        e.preventDefault()
        return true
      },
      setStyle () {
        this.styles.left = (this.width - this.$el.offsetWidth) + 'px'
      }
    }
  ),
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.styles.left = (this.getTableTreeWidth - this.$el.offsetWidth) + 'px'
      }, 10)
    })
  },
  watch: {
    getTableTreeWidth (width) {
      this.styles.left = (width - this.$el.offsetWidth) + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.gantt-side-resizer {
  position: absolute;
  display: block;
  overflow: hidden;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: rgba(0, 0, 0, 0.34);
  cursor: col-resize;
  z-index: 100;
}
</style>
