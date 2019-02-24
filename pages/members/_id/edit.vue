<template>
  <div class="flex flex-col">
    <h1 class="tracking-wide mb-8">Modification du membre</h1>

    <div class="flex mb-8">
      <nuxt-link
        class="inline-flex shadow items-center justify-center hover:bg-neutral-200 transition rounded bg-white px-4 py-2 mr-4"
        to="/members"
      >
        <BackIcon class="fill-current h-8 mr-1" />
        <span>Back</span>
      </nuxt-link>

      <button
        class="inline-flex items-center shadow bg-primary-800 hover:bg-primary-900 transition rounded text-white px-4 py-2"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Prénom"
            name="firstname"
            v-model="form.firstname"
          ></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input
            label="Pseudo"
            name="nickname"
            v-model="form.nickname"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Nom"
            name="lastname"
            v-model="form.lastname"
          ></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Lien photo"
            name="picture"
            v-model="form.picture"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Lien contrat"
            name="contract"
            v-model="form.contract"
          ></base-input>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information Privée</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <date-input
            label="Date de naissance"
            v-model="form.birth_on"
            :yearRange="[1930, 2019]"
          ></date-input>
        </div>

        <div class="w-full">
          <searchable-select
            label="Taille vêtement"
            name="clothes_size"
            :items="clothSizes"
            v-model="form.clothes_size"
          ></searchable-select>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Numéro de téléphone"
            name="phone_number"
            v-model="form.phone_number"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Adresse"
            name="address"
            v-model="form.address"
          ></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Code postale"
            name="postal_code"
            v-model="form.postal_code"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Ville"
            name="city"
            v-model="form.city"
          ></base-input>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Information Bancaire</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="IBAN"
            name="iban"
            v-model="form.iban"
          ></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input
            label="RIB"
            name="rib"
            v-model="form.rib"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="SWIFT"
            name="swift"
            v-model="form.swift"
          ></base-input>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded w-full">
      <header class="mb-8 pb-4 border-b border-neutral-300">
        <h2>Réseaux sociaux</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Facebook"
            name="facebook"
            v-model="form.facebook"
          ></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input
            label="Twitter"
            name="twitter"
            v-model="form.twitter"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Twitch"
            name="twitch"
            v-model="form.twitch"
          ></base-input>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <base-input
            label="Youtube"
            name="youtube"
            v-model="form.youtube"
          ></base-input>
        </div>

        <div class="w-full mr-8">
          <base-input
            label="BattleTag"
            name="battletag"
            v-model="form.battletag"
          ></base-input>
        </div>

        <div class="w-full">
          <base-input
            label="Steam"
            name="steam"
            v-model="form.steam"
          ></base-input>
        </div>
      </div>
    </section>
   </div>
</template>

<script>
import BackIcon from '@/assets/icons/icon-cheveron-left.svg'
import BaseInput from '@/components/Form/BaseInput'
import DateInput from '@/components/Form/DateInput'
import SearchableSelect from '@/components/Form/SearchableSelect'

export default {
  layout: 'app',

  components: { BackIcon, BaseInput, DateInput, SearchableSelect },

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
    member: {},
  }),
  async created () {
    this.member = await this.$axios.$get(`admin/members/${this.$route.params.id}`)

    this.hydrate()
  },

  methods: {
    hydrate () {
      Object.keys(this.member).forEach((key) => {
        this.form[key] = this.member[key]
      })
    },

    async save () {
      try {
        await this.$axios.$put(`admin/members/${this.member.id}`, this.form)
        this.$toast.success('Membre sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

