<template>
    <div class="home mt-5">
        <v-responsive :aspect-ratio="16 / 9">
            <v-container
                fluid
                fill-height
                class="home-hero"
                style="max-height: 100vh;"
            >
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
                        <v-btn dark flat @click="mClose">
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
                            error
                        </v-icon>

                        {{ $t('error_confirm_order') }}
                        <a :href="'mailto:' + email">
                            {{ email }}
                        </a>
                        <v-btn dark flat @click="mClose">
                            {{ $t('close') }}
                        </v-btn>
                    </v-snackbar>
                </v-layout>
            </v-container>
        </v-responsive>
    </div>
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
            email: 'example@test.ru'
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
.home-hero {
    background: url('~assets/images/Masaraty.jpg');
    background-size: cover;
    /*width: 100%;*/
    height: 100%;
    /*height: 100vh;*/
}
</style>
