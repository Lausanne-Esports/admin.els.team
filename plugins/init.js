import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import SvgIcon from 'vue-svgicon'
import '@/components/icons'

Vue.use(VueCompositionApi)
Vue.use(SvgIcon, {
  tagName: 'Icon',
})
