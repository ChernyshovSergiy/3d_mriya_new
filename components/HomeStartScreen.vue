<template>
    <v-responsive :aspect-ratio="16 / 9">
        <v-container
            fluid
            fill-height
            class="home-hero"
            style="max-height: 100vh;"
        >
            <v-layout justify-center align-space-between column>
                <v-spacer />
                <div class="mb-3">
                    <v-layout row wrap justify-space-around align-center>
                        <v-flex xs8 sm6 md3 class="px-3">
                            <v-tooltip bottom>
                                <template #activator="{ on: tooltip }">
                                    <v-btn
                                        v-scroll-to="'#Printing'"
                                        outline
                                        block
                                        large
                                        nuxt
                                        class="caption yellow--text"
                                        v-on="{ ...tooltip }"
                                        ><v-icon left dark large>layers</v-icon>
                                        <span class="headline">
                                            {{ $t('printing') }}
                                        </span>
                                    </v-btn>
                                </template>
                                <span class="yellow--text">
                                    {{ $t('tooltipOrder') }}
                                </span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </div>
                <!--                <v-layout column align-center class="my-2">-->
                <!--                    <v-flex xs12 md3>-->
                <!--                        <v-btn dark color="blue-grey darken-4" @click="change"-->
                <!--                            >Message</v-btn-->
                <!--                        >-->
                <!--                    </v-flex>-->
                <!--                </v-layout>-->

                <div
                    class="display-1 font-weight-light white--text text-xs-center mb-0 "
                >
                    <p>{{ massage }}</p>
                </div>
                <div class="mt-0">
                    <v-layout column align-center class="my-2">
                        <v-flex xs12 md6>
                            <v-btn
                                v-scroll-to="'#Introduction'"
                                fab
                                class="mb-1 transparent"
                                flat
                            >
                                <v-icon large color="yellow"
                                    >expand_more</v-icon
                                >
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </div>
            </v-layout>
            <!--            <v-snackbar-->
            <!--                v-model="corSnackbar"-->
            <!--                color="info"-->
            <!--                value="info"-->
            <!--                label="info"-->
            <!--                multi-line-->
            <!--                :timeout="timeout"-->
            <!--                top-->
            <!--                ><v-icon dark left>-->
            <!--                    done_outline-->
            <!--                </v-icon>-->
            <!--                {{ $t('confirm_order') }}-->
            <!--                <v-btn dark flat @click="mClose">-->
            <!--                    {{ $t('close') }}-->
            <!--                </v-btn>-->
            <!--            </v-snackbar>-->
            <!--            <v-snackbar-->
            <!--                v-model="errSnackbarError"-->
            <!--                color="error"-->
            <!--                value="error"-->
            <!--                label="error"-->
            <!--                multi-line-->
            <!--                :timeout="timeout"-->
            <!--                top-->
            <!--                ><v-icon dark left>-->
            <!--                    error-->
            <!--                </v-icon>-->
            <!--                {{ $t('error_confirm_order') }}{{ email }}-->
            <!--                <v-btn dark flat @click="mClose">-->
            <!--                    {{ $t('close') }}-->
            <!--                </v-btn>-->
            <!--            </v-snackbar>-->
        </v-container>
    </v-responsive>
</template>

<script>
export default {
    name: 'HomeStartScreen',
    props: {
        massage: {
            type: String,
            default: ''
        }
    },

    data: () => ({
        isLoading: false,
        items: [],
        light: false,
        printing: '/order',
        categories: [
            { title: 'Miniatures' },
            { title: 'Jewelry Model' },
            { title: 'Building Layouts' },
            { title: 'Prototypes' }
        ],
        model: null,
        search: null,
        loader: null,
        loading: false,
        loading1: false,
        // timeout: 10000,
        email: '3d_mriya@director.com'
    }),
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

    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        },
        search() {
            // Items have already been loaded
            if (this.items.length > 0) return;

            this.isLoading = true;

            // Lazily load input items
            fetch('https://api.coinmarketcap.com/v2/listings/')
                .then(res => res.json())
                .then(res => {
                    this.items = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => (this.isLoading = false));
        }
    },

    methods: {
        locale() {
            return this.$i18n.locale;
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
