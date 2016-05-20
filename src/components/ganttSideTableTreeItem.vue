<template>
  <div class="tree-item-folder">
    <div class="tree-item">
      <span v-if="isFolder">
        <i class="material-icons"
          @click="toggle(model)"
          v-if="open">expand_more</i>
        <i class="material-icons"
          @click="toggle(model)"
          v-else="!open">chevron_right</i>
      </span>
      <span v-else>
        <i class="material-icons"
          v-else="!open">bubble_chart</i>
      </span>
      <span class="tree-item-model-name"
        @click="toggleRow">{{ model.name }}</span>
    </div>
    <gantt-side-table-tree-item
      class="tree-item-folder"
      v-show="open" v-if="isFolder"
      v-for="model in model.children"
      track-by="$index"
      :model.sync="model">
    </gantt-side-table-tree-item>
  </div>
</template>

<script>
import { toggleTableTreeRow } from '../vuex/actions'
import { getGanttData } from '../vuex/getters'

export default {
  name: 'ganttSideTableTreeItem',
  vuex: {
    actions: {
      toggleTableTreeRow
    }
  },
  props: {
    model: Object
  },
  data () {
    return {
      open: true,
      expand: 'expand_more'
    }
  },
  computed: {
    isFolder () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle (model) {
      this.open = !this.open
      this.toggleTableTreeRow({
        open: this.open,
        model: model
      })
    },
    toggleRow () {
      // TODO
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-item-folder {
  > .tree-item-folder {
    margin-left: 1.2rem;
  }
}
.tree-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
  position: relative;
  height: 2rem;
  &::after {
    position: absolute;
    bottom: 0;
    left: -10rem;
    right: 0;
    content: "";
    display: block;
    height: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.34);
  }
  .material-icons {
    flex: 0 1 auto;
    cursor: pointer;
  }
  .tree-item-model-name {
    flex: 0 1 auto;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>