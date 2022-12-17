import * as Cookies from 'es-cookie'
import defu from 'defu'
import type { $Fetch, FetchContext, FetchOptions } from 'ofetch'


declare const $fetch: $Fetch

export interface OfetchReconfigureOptions extends FetchOptions {
  CSRF?: {
    TARGET_METHODS?: string[]
    ENABLE: boolean
    HEADER_NAME?: string
    COOKIE_KEY?: string
  }
}

const defaultOption: OfetchReconfigureOptions = {
  CSRF: {
    ENABLE: false,
    TARGET_METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
    HEADER_NAME: 'X-XSRF-TOKEN',
    COOKIE_KEY: 'XSRF-TOKEN',
  },
}

const OptionFactory = (overrideOption: OfetchReconfigureOptions) => {
  return defu(overrideOption, defaultOption)
}

const installer = (app: any, option: OfetchReconfigureOptions = {}) => {
  const OPT = OptionFactory(option)

  if (OPT.CSRF!.ENABLE === true) {
    const userCallback = OPT.onRequest
    const csrfTokenSupplier = () => {
      if (OPT.headers === undefined) {
        OPT.headers = {};
        (OPT.headers as any)[OPT.CSRF!.HEADER_NAME!] = Cookies.get(OPT.CSRF!.COOKIE_KEY!)
      }
    }
    OPT.onRequest = (context: FetchContext) => {
      if (userCallback)
        userCallback(context)
      csrfTokenSupplier()
    }
  }


  const _fetch = $fetch.create(OPT)
  app.provide('fetch', _fetch)
  Object.defineProperty(globalThis, '$fetch', {
    get() {
      return _fetch
    },
    set() {
    },
  })
}

export const OfetchConfigureInstallHelper = (nuxtApp: any, option: OfetchReconfigureOptions) => {
  nuxtApp.vueApp.use(installer, option)
}

export default {
  install: installer,
}
