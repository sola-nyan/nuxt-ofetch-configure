/* eslint-disable require-await */
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const cfg = useRuntimeConfig()
  const modOptions = cfg.public.ofetch

  const omyfetchCustomizeConfig = {
    baseURL: modOptions.BASE_URL,
    method: modOptions.METHOD,
    credentials: modOptions.CREDENTIALS as RequestCredentials,
    async onRequest ({ options }: any) {
      const CSRF_OPT = modOptions.DEFAULT_HANDLER.CSRF
      if (CSRF_OPT.ENABLE) {
        if (CSRF_OPT.TARGET_METHODS.includes(options.method)) {
          if (options.headers === undefined) { options.headers = {} }
          options.headers[CSRF_OPT.HEADER_NAME] = CSRF_OPT.TOKEN_SUPPLIER()
        }
      }
    }
  }

  const _fetch = $fetch.create(omyfetchCustomizeConfig)
  Object.defineProperty(globalThis, '$fetch', {
    get () {
      return _fetch
    },
    set () {
    }
  })
})
