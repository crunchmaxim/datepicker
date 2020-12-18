export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'datepicker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [

  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~plugins/vuemask.client.js'},
    { src: '~/plugins/vuex-persist', ssr: false }
    // { src: '~plugins/persistedState.client', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  // pwa: {
  //   meta: {
  //     title: 'My PWA',
  //     author: 'Me',
  //   },
  //   manifest: {
  //     name: 'Nuxt.js PWAs are so easy',
  //     short_name: 'Nuxt.js PWA',
  //     lang: 'en',
  //   },
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
