import Vue from 'vue'

Vue.component('Loader', () =>
  import(/* webpackChunkName: "loader" */ '@/components/Common/Loader.vue')
)

export default async ctx => {
  await ctx.store.dispatch('nuxtClientInit', ctx)
}
