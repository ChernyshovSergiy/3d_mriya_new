<template>
    <v-app>
        <cabinet-navigation />
        <nuxt />
        <!--        <footer-comp />-->
        <app-fab />
    </v-app>
</template>

<script>
// import axios from 'axios'
import CabinetNavigation from '@/components/CabinetNavigation.vue';
// import FooterComp from '@/components/FooterComp.vue'
import AppFab from '@/components/AppFab.vue';
export default {
    name: 'Cabinet',
    head() {
        return this.$nuxtI18nSeo();
    },
    components: {
        CabinetNavigation,
        // FooterComp,
        AppFab
    }
};
</script>

<style scoped></style>
