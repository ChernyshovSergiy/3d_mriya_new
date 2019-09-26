<template>
    <v-app>
        <app-navigation />
        <nuxt />
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue';

export default {
    head() {
        return this.$nuxtI18nSeo();
    },
    components: {
        AppNavigation
    }
};
</script>
<style></style>
