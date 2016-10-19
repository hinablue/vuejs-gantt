<template>
  <div class="tree-item-folder">
    <div class="tree-item" v-if="isFolder">
      <i class="glyphicon glyphicon-chevron-down"
        @click="toggle(model)"
        v-if="open"></i>
      <i class="glyphicon glyphicon-chevron-right"
        @click="toggle(model)"
        v-else="!open"></i>
      <span class="tree-item-model-name"
        @click="toggleRow">{{ model.name }}
      </span>
    </div>
    <div class="tree-item" v-else>
      <i class="glyphicon glyphicon-minus"
        v-if="!open"></i>
      <span class="tree-item-model-name"
        @click="toggleRow">{{ model.name }}
      </span>
    </div>
    <gantt-side-table-tree-item
      class="tree-item-folder"
      v-show="open" v-if="isFolder"
      v-for="model in model.children"
      :model="model">
    </gantt-side-table-tree-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ganttSideTableTreeItem',
  props: {
    model: Object
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    isFolder () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: Object.assign(
    mapActions({
      toggleTableTreeRow: 'toggleTableTreeRow'
    }),
    {
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
  )
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
  vertical-align: middle;
  height: 2rem;
  &::after {
    position: absolute;
    bottom: 0;
    left: -99rem;
    right: 0;
    content: "";
    display: block;
    height: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.34);
  }
  .glyphicon {
    flex: 0 1 auto;
    cursor: pointer;
    margin-right: 0.16rem;
  }
  .tree-item-model-name {
    flex: 0 1 auto;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>