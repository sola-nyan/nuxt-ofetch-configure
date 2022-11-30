import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    MyModule
  ],
  ofetch:{
    BASE_URL: 'https://localhost:8443/'
  }
})
