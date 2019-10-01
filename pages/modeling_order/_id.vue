<template>
    <v-img
        :src="require('~/assets/images/Masaraty.jpg')"
        :lazy-src="require('~/assets/images/MasaratySmall.jpg')"
        aspect-ratio="1"
        class="bg white--text align-content-start"
        width="100%"
        height="100vh"
        contain
        position="start center"
    >
        <v-card-title class="align-end justify-center fill-height pb-10">
            <v-layout row align-center justify-center class="mt-5">
                <v-snackbar
                    v-model="corSnackbar"
                    color="info"
                    value="info"
                    label="info"
                    multi-line
                    :timeout="timeout"
                    top
                    ><v-icon dark left>
                        done_outline
                    </v-icon>
                    {{ $t('confirm_order') }}
                    <v-btn dark text @click="mClose">
                        {{ $t('close') }}
                    </v-btn>
                </v-snackbar>
                <v-snackbar
                    v-model="errSnackbarError"
                    color="error"
                    value="error"
                    label="error"
                    multi-line
                    :timeout="timeout"
                    top
                    ><v-icon dark left>
                        error_outline
                    </v-icon>

                    <div class="text-justify">
                        {{ $t('error_confirm_order') }} <br />
                        <span class="text-center">
                            <a :href="'mailto:' + email">
                                {{ email }}
                            </a>
                        </span>
                    </div>
                    <v-btn dark text @click="mClose">
                        {{ $t('close') }}
                    </v-btn>
                </v-snackbar>
            </v-layout>
        </v-card-title>
    </v-img>
</template>

<script>
export default {
    middleware: 'modeling',
    layout: 'empty',
    name: 'Id',
    data() {
        return {
            token: this.$route.params.id,
            mod: true,
            timeout: 10000,
            email: process.env.adminEmail
        };
    },
    computed: {
        corSnackbar() {
            if (this.$store.getters['order/mSnackbar'] === true) {
                this.resetMessage();
            }
            return this.$store.getters['order/mSnackbar'];
        },
        errSnackbarError() {
            if (this.$store.getters['order/mSnackbarError'] === true) {
                this.resetMessage();
            }
            return this.$store.getters['order/mSnackbarError'];
        }
    },
    methods: {
        mClose() {
            this.$store.dispatch('order/clearOrderModelingErrors');
            this.$router.push(this.localePath('index'));
        },
        resetMessage() {
            const self = this;
            setTimeout(function() {
                self.$store.dispatch('order/clearOrderModelingErrors');
                self.$router.push(self.localePath('index'));
            }, 10000);
            // this.$router.push(this.localePath('index'));
        }
    }
};
</script>

<style scoped>
.bg {
    background: #000509 no-repeat center center;
}
</style>
