<template>
    <div class="home mt-5">
        <v-layout row>
            <v-flex xs12 class="text-center display-1 font-weight-lite my-5">{{
                title
            }}</v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'This is Careers page'
        };
    }
};
</script>

<style scoped></style>
