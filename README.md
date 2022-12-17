# NOTICE

Not tested to work well.


# FEATURE

- Nuxt3 plugin (Not for nuxt2)
- override `globalThis.$fetch` 

# Install

- Run `npm install @solanyan/nuxt-ofetch-configure`
- Add plugin file for install
    - import `OfetchConfigureInstallHelper` make install easy

# Exsample
~/plugin/ofetch.ts

    export default defineNuxtPlugin((nuxtApp) => {
        OfetchConfigureInstallHelper(nuxtApp, {
            baseURL: 'https://localhost:8443/',
            credentials: 'include',
            CSRF: {
                ENABLE: true,
            },
        })
    })

# Options
- Basicaly, same as [ofetch (unjs/ofetch)](https://github.com/unjs/ofetch)  (`FetchOptions` https://github.com/unjs/ofetch/blob/main/src/fetch.ts)
- and extended option under this

        ...,
        CSRF?: {
            TARGET_METHODS?: string[]
            ENABLE: boolean
            HEADER_NAME?: string
            COOKIE_KEY?: string
        }
# Licence
MIT License © 2022 Sola-nyan

