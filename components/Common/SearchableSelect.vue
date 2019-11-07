<template>
  <on-click-outside :do="close">
    <div class="flex flex-col">
      <div class="flex relative">
        <div
          ref="button"
          class="flex items-center text-gray w-full bg-white h-12 rounded-l border border-neutral-300 px-4 mb-6 cursor-pointer"
          type="text"
          @click="open"
        >
          <span v-if="value && items.length > 0">{{ getValue().name }}</span>
          <span class="text-gray-500 opacity-50" v-else>Select your options</span>
        </div>

        <div
          class="flex text-gray-500 items-center justify-center bg-white h-12 rounded-r border border-l-0 border-neutral-300 px-4 cursor-pointer"
          @click="open()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              class="heroicon-ui"
              d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
            />
          </svg>
        </div>

        <div
          ref="dropdown"
          v-show="isOpen"
          class="shadow flex flex-col bg-white rounded absolute m-0 p-2 right left z-30"
        >
          <input
            class="block w-full w-full bg-white h-12 border-neutral-300 border rounded px-4"
            type="text"
            v-model="search"
            ref="search"
            @keydown.esc="close"
            @keydown.up="highlightPrev"
            @keydown.down="highlightNext"
            @keydown.enter.prevent="selectHighlighted"
            @keydown.tab.prevent
          />

          <ul ref="items" class="p0 max-h-52 relative overflow-y-auto">
            <li
              class="cursor-pointer px-4 py-4 mt-2 hover:bg-gray-200 rounded"
              v-for="(item, i) in filteredItems"
              :key="item.id"
              @click="select(item)"
              :class="{ 'is-active': i === highlightedIndex}"
            >{{ item.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import Popper from 'popper.js'
import OnClickOutside from './OnClickOutside'

export default {
  props: {
    items: { required: false, default: [] },
    value: { required: false },
  },

  components: { OnClickOutside },

  data: () => ({
    isOpen: false,
    search: null,
    highlightedIndex: 0,
  }),

  beforeDestroy() {
    if (this.popper !== undefined) {
      this.popper.destroy()
    }
  },

  computed: {
    filteredItems() {
      if (this.search) {
        return this.items.filter(item =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      return this.items
    },
  },

  methods: {
    getValue() {
      return this.items.find(i => i.id === this.value)
    },

    select(item) {
      this.$emit('input', item)
      this.search = null
      this.highlightedIndex = 0
      this.close()
    },

    open() {
      this.isOpen = true
      this.$nextTick(() => {
        this.setupPopper()
        this.$refs.search.focus()
        this.scrollToHighlighted()
      })
    },

    close() {
      this.isOpen = false
    },

    setupPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
          placement: 'bottom-start',
        })
      } else {
        this.popper.scheduleUpdate()
      }
    },

    selectHighlighted() {
      this.select(this.filteredItems[this.highlightedIndex])
    },

    scrollToHighlighted() {
      this.$refs.items.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    },

    highlight(index) {
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredItems.length - 1
      }

      if (this.highlightedIndex > this.filteredItems.length - 1) {
        this.highlightedIndex = 0
      }

      this.scrollToHighlighted()
    },

    highlightPrev() {
      this.highlight(this.highlightedIndex - 1)
    },

    highlightNext() {
      this.highlight(this.highlightedIndex + 1)
    },
  },
}
</script>

<style lang="postcss" scoped>
.is-active {
  @apply .bg-gray-200;
}
</style>
