<template>
  <transition name="fade">
    <div v-show="open" class="flex items-center justify-center modal-backdrop" @click="dismiss">
      <div class="shadow flex flex-col bg-white rounded-lg p-12 lg:w-2/5 md:w-2/3 max-h-screen">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['open'],

  created () {
    const escapeHandler = e => {
      if (e.key === 'Escape' && this.open) {
        this.dismiss()
      }
    }

    document.addEventListener('keydown', escapeHandler)

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })
  },

  methods: {
    dismiss (e) {
      if (e && e.target.classList.contains('modal-backdrop')) {
        this.$emit('close')
      } else if (e === undefined) {
        this.$emit('close')
      }
    },
  },
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
