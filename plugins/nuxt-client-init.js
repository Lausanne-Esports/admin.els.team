import Vue from 'vue'

Vue.component('DateTime', () =>
  import(/* webpackChunkName: "date-time" */ '@/components/Common/DateTime.vue')
)

Vue.component('Spacer', () =>
  import(/* webpackChunkName: "spacer" */ '@/components/Common/Spacer.vue')
)

Vue.component('Panel', () =>
  import(/* webpackChunkName: "panel" */ '@/components/Common/Panel.vue')
)

Vue.component('Loader', () =>
  import(/* webpackChunkName: "loader" */ '@/components/Common/Loader.vue')
)

export default async ctx => {
  await ctx.store.dispatch('nuxtClientInit', ctx)
}
