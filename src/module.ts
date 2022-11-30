import { fileURLToPath } from 'url'
import { addPlugin, createResolver, defineNuxtModule, isNuxt3 } from '@nuxt/kit'
import { defu } from 'defu'

export interface ModuleOptions {
  BASE_URL: string | undefined,
  METHOD: string | undefined,
  CREDENTIALS: RequestCredentials | undefined,
  DEFAULT_HANDLER: {
    CSRF:{
      TARGET_METHODS : string[]
      ENABLE: boolean
      HEADER_NAME: string
      TOKEN_SUPPLIER: () => string
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@solanyan/nuxt-ofetch-configure',
    configKey: 'ofetch',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    BASE_URL: '',
    METHOD: 'GET',
    CREDENTIALS: 'same-origin',
    DEFAULT_HANDLER: {
      CSRF: {
        ENABLE: false,
        TARGET_METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
        HEADER_NAME: 'X-XSRF-TOKEN',
        TOKEN_SUPPLIER: () => document.cookie.match('(^|;)\\s*XSRF-TOKEN\\s*=\\s*([^;]+)')?.pop() ?? ''
      }
    }
  },
  setup (options, nuxt) {
    if (!isNuxt3()) {
      return
    }

    nuxt.options.runtimeConfig.public.ofetch = defu(
      nuxt.options.runtimeConfig.public.ofetch,
      options
    )

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))
  }
})
