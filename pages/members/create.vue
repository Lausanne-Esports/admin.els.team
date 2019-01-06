<template>
  <div class="flex flex-col">
    <h1 class="mb-8">Ajouter un membre</h1>

    <div class="pb-4 mb-4">
      <nuxt-link
        class="border rounded-full py-2 px-8 mr-2 border-darker-blue hover:bg-darker-blue hover:text-white transition"
        to="/members"
      >Retour</nuxt-link>

      <button
        class="border rounded-full py-2 px-8 hover:border-darker-blue bg-darker-blue text-white hover:bg-transparent hover:text-darker-blue transition"
        @click="save"
      >Sauvegarder</button>
    </div>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Information</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Pseudo</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.nickname"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Prénom</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.firstname"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Nom</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.lastname"
            >
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Lien photo</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.picture"
            >
          </div>
        </div>
        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Lien contrat</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.contract"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Information Privée</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Date de naissance</label>
            <date-picker
              v-model="form.birth_on"
            ></date-picker>
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Taille vêtement</label>
            <searchable-select
              :items="clothSizes"
              v-model="form.clothes_size"
            ></searchable-select>
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Numéro de téléphone</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.phone_number"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Adresse</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.address"
            >
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Code postale</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.postal_code"
            >
          </div>
        </div>
        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Ville</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.city"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Information Bancaire</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">IBAN</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.iban"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">RIB</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.rib"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">SWIFT</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.swift"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="p-8 mb-8 bg-white shadow rounded-lg w-full">
      <header class="pb-4 mb-4 border-b border-darker-blue">
        <h2>Réseaux sociaux</h2>
      </header>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Facebook</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.facebook"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Twitter</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.twitter"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Twitch</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.twitch"
            >
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">Youtube</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.youtube"
            >
          </div>
        </div>

        <div class="w-full mr-8">
          <div class="flex flex-col">
            <label class="mb-2">BattleTag</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.battletag"
            >
          </div>
        </div>

        <div class="w-full">
          <div class="flex flex-col">
            <label class="mb-2">Steam</label>
            <input
              class="bg-light-blue-grey text-darker-blue h-12 w-full rounded-lg px-4 mb-6"
              type="text"
              v-model="form.steam"
            >
          </div>
        </div>
      </div>
    </section>
   </div>
</template>

<script>
import DatePicker from '@/components/Common/DatePicker'
import SearchableSelect from '@/components/Common/SearchableSelect'

export default {
  layout: 'app',

  components: { DatePicker, SearchableSelect },

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
    async save () {
      try {
        await this.$axios.$post('admin/members', this.form)
        this.$toast.success('Membre sauvegardé !')
      } catch (e) {
        this.$toast.error('Une erreur est survenue')
      }
    }
  }
}
</script>

