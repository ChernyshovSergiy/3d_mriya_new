<template>
    <span>
        <v-navigation-drawer
            v-model="drawer"
            app
            class="blue-grey darken-4"
            dark
            disable-resize-watcher
        >
            <v-toolbar>
                <v-list>
                    <v-list-item @click="drawer = !drawer">
                        <v-list-item-title class="title"
                            ><v-icon left>menu</v-icon>
                            MENU
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-item
                        v-if="!authenticated"
                        :key="index"
                        active-class="yellow--text"
                        router
                        :to="item.url"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                v-text="item.title"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
                <template v-if="authenticated">
                    <v-list-item active-class="yellow--text" to="/about">
                        <v-list-item-icon>
                            <v-icon>face</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                v-text="'Profile'"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item active-class="yellow--text" @click="logout">
                        <v-list-item-icon>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                v-text="'Logout'"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="#000509" dark>
            <v-toolbar-side-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <nuxt-link to="/">
                <v-toolbar-title class="yellow--text">
                    <span class="font-weight-light">{{ appTitle3 }}</span>
                    <span>{{ appTitle }}</span>
                </v-toolbar-title>
            </nuxt-link>
            <v-btn text class="hidden-sm-and-down" to="/about">Menu</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>

            <div v-if="!authenticated" class="hidden-sm-and-down">
                <v-btn text to="/sign-in">SIGN IN</v-btn>
                <v-btn color="blue-grey darken-4" to="/join">JOIN</v-btn>
            </div>
            <div v-else class="hidden-sm-and-down">
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn text v-on="on"
                                >{{ user.name }}
                                <v-icon dark>expand_more</v-icon>
                            </v-btn>
                        </template>
                        <v-list
                            dark
                            class="blue-grey darken-4 white--text pa-0"
                        >
                            <v-list-item
                                active-class="yellow--text"
                                to="/about"
                            >
                                <v-list-item-icon>
                                    <v-icon>face</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="'Profile'"
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item
                                active-class="yellow--text"
                                @click="logout"
                            >
                                <v-list-item-icon>
                                    <v-icon>exit_to_app</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="'Logout'"
                                    ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <div class="text-center">
                <v-menu offset-y>
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
                                    :title="languag.title"
                                />
                                <v-icon dark right>expand_more</v-icon>
                            </v-flex>
                        </v-btn>
                    </template>
                    <v-list
                        v-for="(item, index) in languages"
                        :key="index"
                        dark
                        class="blue-grey darken-4 white--text pa-0"
                    >
                        <v-list-item
                            v-show="item.language !== locale"
                            @click="changeLanguage(item.language)"
                        >
                            <v-list-item-icon>
                                <flag
                                    :iso="item.flagCountry"
                                    :squared="false"
                                    :title="item.title"
                                />
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="item.title"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-toolbar>
    </span>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
    name: 'AppNavigation',
    data() {
        return {
            tile: true,
            appTitle3: '3D',
            appTitle: 'Mriya',
            drawer: false,
            language: '',
            items: [
                { title: 'Menu', icon: 'home', url: '/about' },
                { title: 'Profile', icon: 'face', url: '/about' },
                { title: 'Sign In', icon: 'lock', url: '/sign-in' },
                { title: 'Join', icon: 'input', url: '/join' }
            ],
            private: [
                { title: 'Profile', icon: 'face', url: '/about' },
                { title: 'Logout', icon: 'lock', url: '/sign-in' }
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
        locales() {
            return this.$store.state.lang.locales;
        },
        locale() {
            return this.$store.state.lang.locale;
        },
        filteredLanguage() {
            const lang = this.$store.state.lang.locale;
            return this.languages.filter(function(elem) {
                if (lang === '') return true;
                else return elem.language.includes(lang);
            });
        }
    },

    methods: {
        logout() {
            this.$auth.logout();
        },
        changeLanguage(locale) {
            this.$store.dispatch('lang/setLanguage', locale);
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
