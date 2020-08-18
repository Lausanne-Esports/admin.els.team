<template>
  <modal :open="open" @close="dismiss()">
    <h3 class="text-xl font-bold mb-8 pb-4 border-b border-primary">Edition</h3>

    <BaseInput label="Role" name="role" v-model="form.role" />
    <NewCheckbox label="Academy" v-model="form.academy" />

    <div class="flex items-center justify-end">
      <button class="mr-8 hover:underline" @click="dismiss()">Cancel</button>
      <button
        class="text-white bg-blue-600 hover:bg-blue-700 rounded py-2 px-4"
        @click="sendQuery()"
      >Update</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/Common/Modal'
import BaseInput from '@/components/Form/BaseInput'
import NewCheckbox from '@/components/Form/NewCheckbox'

export default {
  props: {
    open: { required: true },
    member: { required: true },
    team: { required: true },
  },

  components: { Modal, BaseInput, NewCheckbox },

  data: () => ({
    form: {
      role: '',
      academy: 0,
    },
  }),

  mounted() {
    this.form = {
      role: this.member.pivot_role,
      academy: this.member.pivot_academy,
    }
  },

  methods: {
    async sendQuery() {
      try {
        await this.$axios.$put(
          `admin/teams/${this.team.id}/members/${this.member.id}`,
          this.form
        )
        this.$emit('refreshList', { id: this.member.id, update: this.form })
        this.$toast.success('Member edited!')
        this.dismiss()
      } catch (e) {
        console.log(e)
        this.$toast.error('Something wrong happened')
      }
    },

    dismiss() {
      this.$emit('close')
    },
  },
}
</script>
