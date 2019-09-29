<template>
    <v-card class="mx-auto" flat>
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
                <v-layout column wrap justify-center align-center>
                    <v-flex xs8 sm6 md3 class="py-5">
                        <v-tooltip bottom>
                            <template #activator="{ on: tooltip }">
                                <v-btn
                                    v-scroll-to="'#Printing'"
                                    outlined
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
                    <div
                        class="display-1 font-weight-light white--text text-center mb-0 "
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
                                    text
                                >
                                    <v-icon large color="yellow"
                                        >expand_more</v-icon
                                    >
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-layout>
            </v-card-title>
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
            <!--                <v-btn dark text @click="mClose">-->
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
            <!--                <v-btn dark text @click="mClose">-->
            <!--                    {{ $t('close') }}-->
            <!--                </v-btn>-->
            <!--            </v-snackbar>-->
        </v-img>
    </v-card>
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
.bg {
    background: #000509 no-repeat center center;
}
.home-hero {
    width: 100%;
    /*height: 100%;*/
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background: #052436 url('~assets/images/Masaraty.jpg') no-repeat center
        center;
    transform: scale(1.1);

    /*height: 100vh;*/
}
</style>
