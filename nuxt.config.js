import colors from 'vuetify/es5/util/colors';

export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        // titleTemplate: '%s - ' + process.env.npm_package_name,
        // title: process.env.npm_package_name || '3D Mriya',
        title: '3D Mriya',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#ffea04' },

    router: {
        middleware: ['clearValidationErrors']
    },
    /*
     ** Global CSS
     */
    css: [
        // '~/assets/style/app.styl',
        '~/assets/style/main.css',
        'swiper/dist/css/swiper.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/vuetify',
        './plugins/mixins/validation',
        './plugins/mixins/user',
        './plugins/axios',
        './plugins/vue-flag-icon',
        './plugins/i18n.js',
        './plugins/vue-the-mask.js',
        // './plugins/auth',
        { src: '~/plugins/swiper.js', ssr: false },
        { src: '~/plugins/vue-gallery.js', ssr: false }
    ],

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'auth/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: { url: 'auth/logout', method: 'get' },
                    user: {
                        url: 'user',
                        method: 'get',
                        propertyName: 'data'
                    }
                }
                // tokenRequired: true,
                // tokenType: 'bearer'
            }
        },
        redirect: {
            login: '/sign-in',
            logout: '/',
            home: '/'
        }
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        [
            'nuxt-fontawesome',
            {
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['fas']
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: ['fab']
                    }
                ]
            }
        ],
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'vue-scrollto/nuxt',
        [
            'nuxt-i18n',
            {
                locales: [
                    {
                        flagCountry: 'gb',
                        code: 'en',
                        iso: 'en-GB',
                        file: 'en-GB.js',
                        name: 'English'
                    },
                    {
                        flagCountry: 'ru',
                        code: 'ru',
                        iso: 'ru-RU',
                        file: 'ru-RU.js',
                        name: 'Русский'
                    },
                    {
                        flagCountry: 'es',
                        code: 'es',
                        iso: 'es-ES',
                        file: 'es-ES.js',
                        name: 'Español'
                    },
                    {
                        flagCountry: 'ua',
                        code: 'ua',
                        iso: 'uk-UA',
                        file: 'uk-UA.js',
                        name: 'Український'
                    },
                    {
                        flagCountry: 'de',
                        code: 'de',
                        iso: 'de-DE',
                        file: 'de-DE.js',
                        name: 'Deutsch'
                    }
                ],

                langDir: 'lang/',
                defaultLocale: 'en',
                lazy: true,
                routesNameSeparator: '___',
                defaultLocaleRouteNameSuffix: 'default',
                // Routes generation strategy, can be set to one of the following:
                // - 'prefix_except_default': add locale prefix for every locale except default
                // - 'prefix': add locale prefix for every locale
                // - 'prefix_and_default': add locale prefix for every locale and default
                strategy: 'prefix_except_default',

                detectBrowserLanguage: {
                    // If enabled, a cookie is set once a user has been redirected to his
                    // preferred language to prevent subsequent redirections
                    // Set to false to redirect every time
                    useCookie: true,
                    // Cookie name
                    cookieKey: 'i18n_redirected',
                    // Set to always redirect to value stored in the cookie, not just once
                    alwaysRedirect: true,
                    // If no locale for the browsers locale is a match, use this one as a fallback
                    fallbackLocale: 'en'
                },
                differentDomains: false,
                forwardedHost: false,
                seo: false,
                vuex: {
                    // Module namespace
                    moduleName: 'i18n',

                    // Mutations config
                    mutations: {
                        // Mutation to commit to store current locale, set to false to disable
                        setLocale: 'I18N_SET_LOCALE',

                        // Mutation to commit to store current message, set to false to disable
                        setMessages: 'I18N_SET_MESSAGES'
                    },

                    // PreserveState from server
                    preserveState: false
                },
                onLanguageSwitched: (previous, current) => {
                    if (process.client) {
                        const DATE = new Date();
                        DATE.setTime(DATE.getTime() + 365 * 24 * 3600 * 1000);
                        document.cookie =
                            'lang=' +
                            current +
                            '; path=/; expires=' +
                            DATE.toUTCString();
                    }
                },
                parsePages: true,
                encodePaths: true
            }
        ]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://127.0.0.1:9090/api/v1'
    },
    env: {
        baseUrl: 'http://127.0.0.1:9090/api/v1' || 'http://localhost:3000',
        // baseUrl: process.env.BASE_URL || 'http://localhost:3000'
        adminEmail: '3dmriya@support.ua'
        // adminEmail: process.env.adminEmail || 'example@test.ru'
    },
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        // vendor: ['vue-awesome-swiper'],
        transpile: ['vuetify/lib', 'vue-flag-icon'],
        // plugins: [new VuetifyLoaderPlugin()],
        loaders: {
            stylus: {
                import: ['~assets/style/variables.styl']
            }
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
