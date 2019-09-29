<template>
    <v-app>
        <app-navigation />
        <nuxt />
        <!--        <footer-comp />-->
        <footer-comp :menus="menus" :subjects="subjects" />
        <app-fab />
    </v-app>
</template>

<script>
// import axios from 'axios';
import AppNavigation from '@/components/AppNavigation.vue';
import FooterComp from '@/components/FooterComp.vue';
import AppFab from '@/components/AppFab.vue';

export default {
    // middleware: 'menu',
    head() {
        return this.$nuxtI18nSeo();
    },
    components: {
        AppNavigation,
        FooterComp,
        AppFab
    },
    data() {
        return {
            mini: false,
            sub: [
                'financial',
                'technical',
                'delivery',
                'investments',
                'mass_media',
                'legal',
                'other'
            ],
            subjects: [],
            menus: {}
        };
    },
    computed: {
        clang() {
            return this.$i18n.locale;
        }
    },
    watch: {
        clang(newValue, oldValue) {
            this.translateSub();
            this.changeMenus();
        }
    },
    created() {
        this.translateSub();
        this.changeMenus();
    },
    methods: {
        changeMenus() {
            this.$store
                .dispatch('menu/getMenu', this.clang)
                .then(() => {
                    this.menus = Object.assign(
                        {},
                        this.$store.getters['menu/getMenus']
                    );
                })
                .catch(e => {
                    console.log('Error Created(): ', e);
                });
        },
        translateSub() {
            const self = this;
            self.subjects = [];
            self.sub.forEach(function(theme) {
                self.subjects.push(self.$t(theme));
            });
        },
        navToggle() {
            this.mini = !this.mini;
        }
    }
};
</script>
<style></style>
