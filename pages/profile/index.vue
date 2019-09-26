<template>
    <v-container class="mt-3">
        <v-layout column>
            <v-flex class="display-2 text-xs-center my-5"
                >User Profile {{ $route.params.id }}</v-flex
            >
        </v-layout>
    </v-container>
</template>

<script>
export default {
    layout: 'cabinet',
    middleware: 'auth'
};
</script>

<style scoped></style>
