<template>
  <div class="gantt-side-resizer"
    v-bind:style="styles"
    @mousedown="dragStart | notPrevented | prevent"
    @touchstart="dragStart | notPrevented | prevent"
    @dblclick="dragStart | notPrevented | prevent">
  </div>
</template>

<script>
export default {
  name: 'ganttSideResizer',
  filters: {
    notPrevented: require ('vue-filters/notPrevented'),
    prevent: require ('vue-filters/prevent')
  },
  mixins: [
    require ('vue-mixins/onceDocument'),
    require ('vue-mixins/onDocument')
  ],
  props: {
    size: {
      type: Number
    }
  },
  data () {
    return {
      startPos: 0,
      startSize: 0,
      minSize: 200,
      removeMoveListener: null,
      removeEndListener: null,
      styles: {
        left: '0px'
      }
    };
  },
  methods: {
    dragStart (e) {
      this.startSize = this.size;
      this.startPos = e.clientX;

      this.removeMoveListener = this.onDocument(
        'mousemove',
        this.drag
      );
      this.removeEndListener = this.onceDocument(
        'mouseup',
        this.dragEnd
      );
    },
    drag (e) {
      this.size = this.startSize + (e.clientX - this.startPos);
      e.preventDefault();
    },
    dragEnd (e) {
      this.removeMoveListener();
      this.removeEndListener();
      e.preventDefault();
      return true;
    },
    setStyle () {
      this.styles.left = (this.size - this.$el.offsetWidth) + 'px';
    }
  },
  watch: {
    size (newSize, oldSize) {
      if (newSize !== oldSize
        && newSize >= this.minSize) {
        this.size = newSize;
        this.setStyle();
      } else {
        this.size = this.minSize + 1;
        this.removeMoveListener();
        this.removeEndListener();
      }
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
