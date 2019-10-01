<template>
    <span>
        <v-navigation-drawer
            v-model="drawer"
            app
            dark
            :src="require('~/assets/images/3d-printerFone.jpg')"
            :mini-variant.sync="mini"
            :clipped="$vuetify.breakpoint.smAndDown"
            :value="mini"
            disable-resize-watcher
        >
            <v-list>
                <v-list-item>
                    <v-list-item-avatar
                        color="grey darken-3"
                        size="50px"
                        style="cursor: pointer"
                    >
                        <v-img class="elevation-6" :src="gravatar" />
                    </v-list-item-avatar>
                    <v-list-item-title>
                        {{ user.name }}
                    </v-list-item-title>
                    <v-btn icon @click.stop="navToggle">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item active-class="yellow--text" @click="logout">
                    <v-list-item-icon>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title
                            v-text="`${$t('logout')}`"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="#000509" dark>
            <v-app-bar-nav-icon
                @click="drawer = !drawer"
                @click.stop="navToggle"
            />
            <v-spacer></v-spacer>
            <nuxt-link :to="localePath('index')">
                <v-toolbar-title class="yellow--text">
                    <span class="font-weight-light">{{ appTitle3 }}</span>
                    <span>{{ appTitle }}</span>
                </v-toolbar-title>
            </nuxt-link>
            <!--            <v-btn-->
            <!--                text-->
            <!--                class="hidden-sm-and-down"-->
            <!--                :to="localePath('about')"-->
            <!--                nuxt-->
            <!--                >{{ $t('menu') }}</v-btn-->
            <!--            >-->
            <div class="text-center">
                <v-menu open-on-hover offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-for="(languag, i) in filteredLanguage"
                            :key="i"
                            v-model="language"
                            class="pa-0"
                            depressed
                            large
                            text
                            v-on="on"
                        >
                            <v-flex
                                id="flag"
                                align-center
                                justify-center
                                layout
                            >
                                <flag
                                    :iso="languag.flagCountry"
                                    :squared="false"
                                    :title="languag.name"
                                />
                                <v-icon dark right>expand_more</v-icon>
                            </v-flex>
                        </v-btn>
                    </template>
                    <v-list dark color="#052238" class="pa-0"
                        ><nuxt-link
                            v-for="loc in availableLocales"
                            :key="loc.code"
                            :to="switchLocalePath(loc.code)"
                        >
                            <v-divider />
                            <v-list-item @click="changeLocale(loc.code)">
                                <v-list-item-action style="font-size:24px">
                                    <flag
                                        :iso="loc.flagCountry"
                                        :squared="false"
                                        :title="loc.name"
                                    />
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="loc.name" />
                                </v-list-item-content>
                            </v-list-item>
                        </nuxt-link>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>
    </span>
</template>

<script>
import md5 from 'md5';
export default {
    name: 'CabinetNavigation',
    data() {
        return {
            tile: true,
            appTitle3: '3D',
            appTitle: 'Mriya',
            drawer: true,
            light: false,
            mini: false,
            language: '',
            size: 140,
            defaultImg: 'mm',
            rating: 'g',
            items: [
                { title: 'home', icon: 'home', url: 'index' },
                { title: 'profile', icon: 'face', url: 'profile' },
                { title: 'sign_in', icon: 'lock', url: 'sign-in' },
                { title: 'join', icon: 'input', url: 'join' }
            ],
            private: [
                { title: 'Profile', icon: 'face', url: 'profile' },
                { title: 'Logout', icon: 'lock', url: 'sign-in' }
            ],
            languages: [
                { flagCountry: 'gb', language: 'en', title: 'English' },
                { flagCountry: 'es', language: 'es', title: 'Español' },
                { flagCountry: 'ru', language: 'ru', title: 'Русский' },
                { flagCountry: 'ua', language: 'ua', title: 'Український' },
                { flagCountry: 'de', language: 'de', title: 'Deutsch' },
                { flagCountry: 'it', language: 'it', title: 'Italiano' },
                { flagCountry: 'fr', language: 'fr', title: 'Le français' },
                { flagCountry: 'sa', language: 'sa', title: 'العربية' },
                { flagCountry: 'cn', language: 'cn', title: '中国' },
                { flagCountry: 'jp', language: 'jp', title: '日本語' }
            ]
        };
    },
    computed: {
        isAuthenticated() {
            // return this.$store.getters.isAuthenticated
            return false;
        },
        filteredLanguage() {
            return this.$i18n.locales.filter(i => i.code === this.$i18n.locale);
        },
        availableLocales() {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
        },
        gravatar() {
            if (this.user.email !== null) {
                const img = [
                    '//www.gravatar.com/avatar/',
                    this.hash || md5(this.user.email.toLowerCase()),
                    `?s=${this.size}`,
                    `&d=${this.defaultImg}`,
                    `&r=${this.rating}`
                ];
                return img.join('');
            }
            return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=80';
        },
        center() {
            return this.mini ? 'text-center' : '';
        }
    },

    methods: {
        logout() {
            this.$auth.logout();
        },
        navToggle() {
            this.mini = !this.mini;
        }
    }
};
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
#flag {
    font-size: 30px;
    padding: 0;
    margin-top: 0;
}
</style>
