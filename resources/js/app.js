import './bootstrap'

import { createPinia, PiniaVuePlugin } from 'pinia'
import { useCommonStore } from './Stores/common'

import { createApp, h } from 'vue'
import { createInertiaApp, router } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'

import PrimeVue from 'primevue/config'
import primeVueComponents from '@/Components/primeVue'
import primeVueDirectives from '@/Directives/primeVue'
import primeVueServices from '@/Plugins/primeVue'
import commonComponents from './Components/common/index'
import directives from './Directives'

const pinia = createPinia()
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    App.created = () => {
      const commonStore = useCommonStore()
      commonStore.init()
      commonStore.$patch({
        user: props.initialPage.props?.auth?.user || null
      })
      router.on('success', (event) => {
        commonStore.$patch({
          user: event.detail.page.props?.auth?.user || null
        })
      })
    }

    const app = createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue, Ziggy)
      .use(pinia)
      .use(PrimeVue, { ripple: true })

    primeVueComponents.forEach((component) => {
      app.component(component.name, component)
    })
    primeVueDirectives.forEach((directive) => {
      app.directive(directive.name, directive.directive)
    })
    primeVueServices.forEach((service) => {
      app.use(service)
    })
    commonComponents.forEach((component) => {
      app.component(component.name ?? component.__name, component)
    })
    directives.forEach((directive) => {
      app.directive(directive.name, directive.directive)
    })

    return app.mount(el)
  },
  progress: {
    color: '#4B5563'
  }
})
