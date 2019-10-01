<template>
    <div>
        <v-container fill-height class="mt-5">
            <v-layout align-center justify-center class="my-5">
                <v-flex xs12 sm8 md6>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue-grey darken-4">
                            <v-toolbar-title>
                                {{ $t('join_form') }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="form.name"
                                    prepend-icon="person"
                                    name="name"
                                    :label="`${$t('name')}`"
                                    type="name"
                                    :rules="nameRules"
                                    data-cy="joinNameField"
                                    required
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="form.email"
                                    prepend-icon="email"
                                    name="email"
                                    :label="`${$t('email')}`"
                                    type="email"
                                    :rules="emailRules"
                                    data-cy="joinEmailField"
                                    required
                                    autocomplete="email"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="form.password"
                                    prepend-icon="lock"
                                    name="password"
                                    :label="`${$t('password')}`"
                                    required
                                    :rules="passwordRules"
                                    data-cy="joinPasswordField"
                                    autocomplete="password"
                                    :append-icon="
                                        passwordHidden
                                            ? 'visibility_off'
                                            : 'visibility'
                                    "
                                    :type="passwordHidden ? 'password' : 'text'"
                                    @click:append="
                                        () => (passwordHidden = !passwordHidden)
                                    "
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="form.password_confirmation"
                                    prepend-icon="check_circle_outline"
                                    name="password_confirmation"
                                    :label="`${$t('password_confirmation')}`"
                                    type="password"
                                    required
                                    :rules="confirmationPasswordRules"
                                    data-cy="joinPasswordField"
                                    autocomplete="password_confirmation"
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                dark
                                color="blue-grey darken-4"
                                :disabled="!valid"
                                data-cy="joinSubmitBtn"
                                @click="submit"
                                >{{ $t('join') }}</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600">
                <v-card>
                    <v-toolbar dark color="warning">
                        <v-toolbar-title>
                            {{ $t('dear') }}&emsp;
                            <strong>
                                {{ form.name }}
                            </strong>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-title
                        class="subtitle-2 grey lighten-2 text-center"
                        primary-title
                        >&emsp;{{ $t('thank_you_for_try_join_to_us') }}&emsp;
                        <strong class="error--text">{{ form.email }}</strong
                        >&emsp;{{ $t('email_has_already_been_taken') }}!!!
                    </v-card-title>
                    <v-card-text>
                        &emsp;
                        {{ $t('if_this_email_address_is_yours_please_click') }}
                        <strong class="success--text">
                            {{ $t('sign_in') }}
                        </strong>
                        {{ $t('and_log_in_to_your_account') }}<br />
                        &emsp;{{ $t('if_you_forgot_the_password_click') }}
                        <strong class="primary--text">{{
                            $t('restore')
                        }}</strong>
                        {{ $t('and_check_your_email') }}<br />
                        &emsp;{{
                            $t(
                                'if_you_made_a_mistake_when_writing_an_email_click'
                            )
                        }}
                        <strong class="warning--text">{{ $t('edit') }}</strong
                        >,
                        {{
                            $t(
                                'enter_the_correct_email_and_complete_the_registration'
                            )
                        }}
                    </v-card-text>
                    <!--<v-divider></v-divider>-->
                    <v-progress-linear
                        :indeterminate="indeterminate"
                    ></v-progress-linear>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" outlined @click="toAccount">{{
                            $t('sign_in')
                        }}</v-btn>
                        <v-btn
                            color="primary"
                            outlined
                            :loading="loading"
                            @click="requestResetPassword"
                            >{{ $t('restore') }}</v-btn
                        >
                        <v-btn
                            color="warning"
                            outlined
                            @click="dialog = false"
                            >{{ $t('edit') }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog
                v-model="dialog2"
                persistent
                max-width="600"
                class="text-center"
            >
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>
                            {{ $t('dear') }}&emsp;
                            <strong>
                                {{ form.name }}
                            </strong>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-title
                        class="subtitle-2 grey lighten-2 text-center"
                        primary-title
                    >
                        &emsp;{{ $t('please_check_your_email') }}
                        <strong class="error--text">
                            &emsp;{{ form.email }}
                        </strong>
                        &emsp;{{ $t('to_change_password') }}</v-card-title
                    >
                    <v-card-text class="text-center">
                        &emsp;{{ $t('link_is_valid_for_60_minutes') }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            outlined
                            to="/"
                            @click="dialog2 = false"
                            >{{ $t('ok') }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
export default {
    middleware: 'guest',
    name: 'Home',
    data() {
        return {
            valid: false,
            dialog: false,
            dialog2: false,
            massage: '',
            indeterminate: false,
            loading: false,
            passwordHidden: true,
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
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
            passwordRules: [
                v => !!v || this.$t('password_is_required'),
                v =>
                    v.length >= 8 ||
                    this.$t('password_must_be_greater_than_8_characters')
            ],
            confirmationPasswordRules: [
                v => !!v || this.$t('password_confirmation_is_required'),
                v =>
                    v === this.form.password ||
                    this.$t('password_must_be_confirm')
            ]
        };
    },
    methods: {
        toAccount() {
            this.dialog = false;
            this.$router.push('/sign-in');
        },
        async requestResetPassword() {
            this.indeterminate = true;
            this.loading = true;
            try {
                await this.$axios
                    .post('/auth/reset-password', {
                        email: this.form.email,
                        language: this.form.cLang
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            this.loading = false;
                            this.indeterminate = false;
                            this.dialog = false;
                            this.dialog2 = true;
                        },
                        error => {
                            console.error(error);
                        }
                    );
            } catch (e) {}
        },
        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    await this.$axios
                        .post('/auth/register', this.form)
                        .then(response => {
                            if (response.data.errors.email[0] !== '') {
                                this.dialog = true;
                            } else {
                                this.$router.push('/sign-in');
                            }
                        })
                        .catch(err => {
                            console.log('err11 ', err);
                        });
                } catch (e) {}
            }
        }
    },
    strict: process.env.NODE_ENV !== 'production'
};
</script>

<style scoped></style>
