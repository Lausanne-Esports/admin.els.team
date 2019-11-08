<template>
  <div class="flex flex-col">
    <Heading>Add a member</Heading>
    <Spacer direction="b" :size="8" />

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-gray-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/members"
      >
        <Icon name="cheveron-left" class="h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-blue-800 hover:bg-blue-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Save</button>
    </div>

    <!-- General Information Section -->
    <Panel header="General Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="First name" name="firstname" v-model="form.firstname"></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input label="Pseudo" name="nickname" v-model="form.nickname"></base-input>
        </div>

        <div class="w-full">
          <base-input label="Last name" name="lastname" v-model="form.lastname"></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Picture URL" name="picture" v-model="form.picture"></base-input>
        </div>

        <div class="w-full">
          <base-input label="Contract URL" name="contract" v-model="form.contract"></base-input>
        </div>
      </div>
    </Panel>

    <Spacer direction="b" :size="8" />

    <!-- Private Information Section -->
    <Panel header="Private Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <DateTimePicker label="Birth Date" name="published_at" v-model="form.birth_on" />
        </div>

        <div class="w-full">
          <searchable-select
            label="Clothing Sizes"
            name="clothes_size"
            :items="clothSizes"
            v-model="form.clothes_size"
          ></searchable-select>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Phone number" name="phone_number" v-model="form.phone_number"></base-input>
        </div>

        <div class="w-full">
          <base-input label="Address" name="address" v-model="form.address"></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Postal Code" name="postal_code" v-model="form.postal_code"></base-input>
        </div>

        <div class="w-full">
          <base-input label="City" name="city" v-model="form.city"></base-input>
        </div>
      </div>
    </Panel>

    <Spacer direction="b" :size="8" />

    <!-- Bank Information Section -->
    <Panel header="Bank Information">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="IBAN" name="iban" v-model="form.iban"></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input label="RIB" name="rib" v-model="form.rib"></base-input>
        </div>

        <div class="w-full">
          <base-input label="SWIFT" name="swift" v-model="form.swift"></base-input>
        </div>
      </div>
    </Panel>

    <Spacer direction="b" :size="8" />

    <!-- Social Networks Section -->
    <Panel header="Social Networks">
      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Facebook" name="facebook" v-model="form.facebook"></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input label="Twitter" name="twitter" v-model="form.twitter"></base-input>
        </div>

        <div class="w-full">
          <base-input label="Twitch" name="twitch" v-model="form.twitch"></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input label="Youtube" name="youtube" v-model="form.youtube"></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input label="BattleTag" name="battletag" v-model="form.battletag"></base-input>
        </div>

        <div class="w-full">
          <base-input label="Steam" name="steam" v-model="form.steam"></base-input>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import BaseInput from '@/components/Form/BaseInput'
import SearchableSelect from '@/components/Form/SearchableSelect'
import DateTimePicker from '@/components/Form/DateTimePicker'

export default {
  layout: 'app',

  components: { BaseInput, DateTimePicker, SearchableSelect },

  data: () => ({
    form: {
      nickname: null,
      firstname: null,
      lastname: null,
      birth_on: null,
      clothes_size: null,
      phone_number: null,
      address: null,
      postal_code: null,
      city: null,
      contract: null,
      picture: null,
      iban: null,
      rib: null,
      swift: null,
      facebook: null,
      twitter: null,
      twitch: null,
      youtube: null,
      battletag: null,
      steam: null,
    },
    clothSizes: [
      { id: 'xs', name: 'XS' },
      { id: 's', name: 'S' },
      { id: 'm', name: 'M' },
      { id: 'l', name: 'L' },
      { id: 'xl', name: 'XL' },
      { id: 'xxl', name: 'XXL' },
    ],
  }),

  methods: {
    async save() {
      try {
        await this.$axios.$post('admin/members', this.form)
        this.$router.push('/members')
        this.$toast.success('Membre sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    },
  },
}
</script>

