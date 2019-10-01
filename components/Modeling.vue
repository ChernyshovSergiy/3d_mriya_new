<template>
    <v-container id="Modeling" class="pt-5">
        <v-layout align-center justify-space-between row wrap fill-height>
            <v-flex xs12 md4 block mt-5>
                <v-responsive>
                    <v-img
                        :src="require('~/assets/images/Modeling.png')"
                        height="100%"
                    />
                </v-responsive>
            </v-flex>
            <v-flex xs12 md7 block>
                <v-card flat color="transparent">
                    <v-card-title primary class="display-2 text-capitalize">
                        {{ title }}
                    </v-card-title>
                    <v-card-text class="subheading elevation-2 pa-1">
                        <v-responsive>
                            <v-img
                                :src="require('~/assets/images/convert.svg')"
                                width="auto"
                            >
                                <v-layout
                                    align-center
                                    justify-center
                                    fill-height
                                    px-5
                                    black--text
                                >
                                    <v-card-text>
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation
                                        >
                                            <v-layout
                                                row
                                                wrap
                                                align-space-around
                                                fill-height
                                            >
                                                <v-flex xs12 md6>
                                                    <v-text-field
                                                        v-model.trim="form.name"
                                                        prepend-icon="person"
                                                        name="name"
                                                        :label="`${$t('name')}`"
                                                        type="name"
                                                        :rules="nameRules"
                                                        :counter="20"
                                                        data-cy="joinNameField"
                                                        required
                                                    >
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs12 md6>
                                                    <v-text-field
                                                        v-model.trim="
                                                            form.email
                                                        "
                                                        prepend-icon="email"
                                                        name="email"
                                                        :label="
                                                            `${$t('email')}`
                                                        "
                                                        type="email"
                                                        :rules="emailRules"
                                                        data-cy="joinEmailField"
                                                        required
                                                        autocomplete="email"
                                                    >
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout
                                                row
                                                wrap
                                                align-space-around
                                                fill-height
                                            >
                                                <v-flex xs11>
                                                    <v-text-field
                                                        v-model.trim="form.link"
                                                        prepend-icon="link"
                                                        name="link"
                                                        :label="
                                                            `${$t(
                                                                'link_modeling_order'
                                                            )}`
                                                        "
                                                        type="link"
                                                        required
                                                        :rules="linkRules"
                                                        data-cy="LinkField"
                                                        autocomplete="link"
                                                    >
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs1 class="mt-3">
                                                    <v-spacer />
                                                    <v-tooltip
                                                        bottom
                                                        max-width="500px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on
                                                            }"
                                                        >
                                                            <span v-on="on">
                                                                <v-avatar
                                                                    size="30"
                                                                    color="grey lighten-4"
                                                                    class="elevation-5"
                                                                >
                                                                    <v-icon
                                                                        :style="{
                                                                            cursor:
                                                                                'pointer'
                                                                        }"
                                                                        large
                                                                        color="indigo darken-4"
                                                                        >info</v-icon
                                                                    >
                                                                </v-avatar></span
                                                            >
                                                        </template>
                                                        <span class="body-1">{{
                                                            $t(
                                                                'desc_google_folder'
                                                            )
                                                        }}</span>
                                                    </v-tooltip>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout
                                                row
                                                wrap
                                                align-space-around
                                                fill-height
                                            >
                                                <v-flex xs11 sm8>
                                                    <v-checkbox
                                                        v-model="form.checkbox"
                                                        :label="
                                                            `${$t(
                                                                'texturing_and_rendering'
                                                            )}`
                                                        "
                                                        color="orange"
                                                    ></v-checkbox>
                                                </v-flex>
                                                <v-flex xs1 sm4 class="mt-3">
                                                    <v-spacer />
                                                    <v-tooltip
                                                        bottom
                                                        max-width="500px"
                                                    >
                                                        <template
                                                            v-slot:activator="{
                                                                on
                                                            }"
                                                        >
                                                            <span v-on="on">
                                                                <v-avatar
                                                                    size="30"
                                                                    color="grey lighten-4"
                                                                    class="elevation-5"
                                                                >
                                                                    <v-icon
                                                                        :style="{
                                                                            cursor:
                                                                                'pointer'
                                                                        }"
                                                                        large
                                                                        color="indigo darken-4"
                                                                        >info</v-icon
                                                                    >
                                                                </v-avatar></span
                                                            >
                                                        </template>
                                                        <span class="body-1">
                                                            {{
                                                                $t(
                                                                    'rendering_info'
                                                                )
                                                            }}</span
                                                        >
                                                    </v-tooltip>
                                                </v-flex>
                                            </v-layout>
                                            <v-card-actions class="my-auto">
                                                <v-spacer />
                                                <v-btn
                                                    :disabled="!valid"
                                                    outlined
                                                    color="orange"
                                                    :loading="loading"
                                                    depressed
                                                    @click="submit"
                                                >
                                                    {{ $t('order_model') }}
                                                </v-btn>
                                            </v-card-actions>
                                        </v-form>
                                    </v-card-text>
                                </v-layout>
                            </v-img>
                        </v-responsive>
                    </v-card-text>
                    <v-snackbar
                        v-model="snackbar"
                        color="info"
                        value="info"
                        label="info"
                        multi-line
                        :timeout="timeout"
                        absolute
                        ><v-icon dark left>
                            done_outline
                        </v-icon>
                        {{ $t('sent_modeling_order') }}
                        <v-btn dark text @click="snackbar = false">
                            {{ $t('close') }}
                        </v-btn>
                    </v-snackbar>
                    <v-snackbar
                        v-model="snackbarError"
                        color="error"
                        value="error"
                        label="error"
                        multi-line
                        :timeout="timeout"
                        absolute
                        ><v-icon dark left>
                            error
                        </v-icon>
                        {{ $t('error_sent_modeling_order') }}
                        <v-btn dark text @click="snackbarError = false">
                            {{ $t('close') }}
                        </v-btn>
                    </v-snackbar>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { VTextField } from 'vuetify/lib';
export default {
    name: 'Modeling',
    components: {
        VTextField
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            valid: true,
            snackbar: false,
            snackbarError: false,
            loading: false,
            timeout: 10000,
            form: {
                name: '',
                email: '',
                link: '',
                checkbox: false,
                cLang: this.$i18n.locale
            },
            nameRules: [
                v => !!v || this.$t('name_is_required'),
                v =>
                    v.length >= 3 ||
                    this.$t('name_must_be_greater_than_3_characters'),
                v =>
                    v.length <= 20 ||
                    this.$t('name_must_be_less_than_20_characters')
            ],
            emailRules: [
                v => !!v || this.$t('email_is_required'),
                v =>
                    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
                        v
                    ) || this.$t('email_must_be_valid')
            ],
            linkRules: [
                v => !!v || this.$t('link_is_required'),
                v =>
                    /^(ftp|http|https):\/\/[^ "]+$/.test(v) ||
                    this.$t('link_must_be_valid'),
                v =>
                    v.length <= 500 ||
                    this.$t('link_must_be_less_than_500_characters')
            ]
        };
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    this.loading = true;
                    const self = this;
                    await this.$axios
                        .post('/order/modeling', this.form)
                        .then(() => {
                            self.snackbar = true;
                            self.form.name = '';
                            self.form.email = '';
                            self.form.link = '';
                            self.form.checkbox = false;
                            self.loading = false;
                            self.$refs.form.resetValidation();
                        })
                        .catch(err => {
                            console.log('err11 ', err);
                            self.snackbarError = true;
                            self.loading = false;
                        });
                    // setTimeout(function() {
                    //     self.snackbar = true
                    //     self.form.name = ''
                    //     self.form.email = ''
                    //     self.form.link = ''
                    //     self.form.checkbox = false
                    //     self.loading = false
                    //     self.$refs.form.resetValidation()
                    // }, this.timeout / 2)
                } catch (e) {}
            }
        }
    }
};
</script>

<style scoped></style>
