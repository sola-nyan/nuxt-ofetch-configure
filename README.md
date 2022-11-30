# NOTICE

Not tested to work well.

# FEATURE

- override `globalThis.$fetch` by configured ofetch with `nuxt.config.ts`

# Install

- Run `npm install @solanyan/nuxt-ofetch-configure`
- Add config `ofetch` to `nuxt.config.ts`

# Default Config
    ofetch: {
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
    }

# Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

# Licence

MIT License © 2022 Sola-nyan

