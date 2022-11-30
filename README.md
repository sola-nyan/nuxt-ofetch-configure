# NOTICE

Not tested to work well.

# FEATURE

- override `globalThis.$fetch` by configured ofetch with `nuxt.config.ts`

# Install

- Run `npm install @solanyan/nuxt-ofetch-configure`
- Add modules `@solanyan/nuxt-ofetch-configure` and config `ofetch` to `nuxt.config.ts`

# Default Config
    ofetch: {
        BASE_URL: '',
        METHOD: 'GET',
        CREDENTIALS: 'same-origin',
        DEFAULT_ON_REQUEST: {
            CSRF: {
                ENABLE: false,
                TARGET_METHODS: ['POST', 'PUT', 'DELETE', 'PATCH'],
                HEADER_NAME: 'X-XSRF-TOKEN',
                COOKIE_KEY: 'XSRF-TOKEN'
            }
        }
    }

# Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

# Licence

MIT License © 2022 Sola-nyan

