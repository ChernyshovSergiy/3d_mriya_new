<template>
    <v-card
        dark
        flat
        title
        color="#031016"
        class="yellow--text  text-center  flex"
    >
        <v-layout row wrap>
            <v-flex xs12 class="footerBG">
                <v-img :src="require('~/assets/images/footerBG.jpg')">
                    <v-container>
                        <v-layout my-1 column wrap>
                            <v-flex xs12>
                                <span class="display-2 footerTitle">
                                    {{ $t('footer_massage') }}
                                </span>
                            </v-flex>
                            <v-layout
                                align-start
                                justify-center
                                row
                                wrap
                                class="mt-5"
                            >
                                <v-flex
                                    xs12
                                    sm4
                                    md3
                                    class="font-weight-light title text-left"
                                    size="24px"
                                >
                                    <v-card class="transparent mx-1" flat>
                                        <v-list subheader class="transparent">
                                            <v-subheader
                                                class="font-weight-regular yellow--text title"
                                                v-text="menus.title1"
                                            ></v-subheader>

                                            <v-list-item
                                                v-for="(item,
                                                index) in menus.points1"
                                                :key="index"
                                                :to="localePath(item.to)"
                                                no-prefetch
                                                nuxt
                                                active-class="yellow--text font-weight-medium"
                                                @click="index + 10"
                                            >
                                                <v-list-item-title
                                                    class="text-left"
                                                    v-text="item.point"
                                                />
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                    <v-container grid-list-xs fluid mt-5>
                                        <v-layout row wrap>
                                            <v-flex
                                                v-for="(FinCard, i) in FinCards"
                                                :key="i"
                                                xs4
                                            >
                                                <v-card flat>
                                                    <v-img
                                                        :src="
                                                            require('~/assets/images/cards/' +
                                                                `${FinCard.image}`)
                                                        "
                                                        height="35px"
                                                    ></v-img>
                                                </v-card>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm4
                                    md3
                                    class="font-weight-light title text-left"
                                    size="24px"
                                >
                                    <v-card dark class="transparent mx-1" flat>
                                        <v-list subheader class="transparent">
                                            <v-subheader
                                                class="font-weight-regular yellow--text title"
                                                v-text="menus.title2"
                                            ></v-subheader>
                                            <v-list-item
                                                v-for="(item,
                                                index) in menus.points2"
                                                :key="`${index}-2`"
                                                :to="localePath(item.to)"
                                                nuxt
                                                active-class="yellow--text font-weight-medium"
                                                @click="index + 20"
                                            >
                                                <v-list-item-title
                                                    class="text-left"
                                                    v-text="item.point"
                                                />
                                            </v-list-item>
                                            <v-subheader
                                                class="font-weight-regular yellow--text title"
                                                v-text="menus.title3"
                                            ></v-subheader>
                                            <v-list-item
                                                v-for="(item,
                                                index) in menus.points3"
                                                :key="`${index}-3`"
                                                active-class="yellow--text font-weight-medium"
                                                :to="localePath(item.to)"
                                                nuxt
                                                @click="index + 30"
                                            >
                                                <v-list-item-title
                                                    class="text-left"
                                                    v-text="item.point"
                                                />
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm4
                                    md3
                                    class="font-weight-light title text-left"
                                    size="24px"
                                >
                                    <v-card dark class="transparent mx-1" flat>
                                        <v-list subheader class="transparent">
                                            <v-subheader
                                                class="font-weight-regular yellow--text title"
                                                v-text="menus.title4"
                                            ></v-subheader>
                                            <v-list-item
                                                v-for="(item,
                                                index) in menus.points4"
                                                :key="`${index}-4`"
                                                exact
                                                active-class="yellow--text font-weight-black"
                                                :to="localePath(item.to)"
                                                nuxt
                                                @click="index + 40"
                                            >
                                                <v-list-item-title
                                                    class="text-left"
                                                    v-text="item.point"
                                                />
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                                <v-flex
                                    xs12
                                    sm8
                                    md3
                                    class="font-weight-light title text-md-left"
                                    size="24px"
                                >
                                    <v-card class="transparent mx-0" flat dark>
                                        <v-list
                                            subheader
                                            dark
                                            class="transparent text-xs-right"
                                        >
                                            <v-subheader
                                                class="font-weight-regular yellow--text title"
                                                v-text="`${$t('contact')}`"
                                            ></v-subheader>
                                            <v-form
                                                ref="form"
                                                v-model="valid"
                                                lazy-validation
                                                dark
                                            >
                                                <v-text-field
                                                    v-model="name"
                                                    prepend-icon="person"
                                                    :counter="10"
                                                    :rules="nameRules"
                                                    :label="`${$t('name')}`"
                                                    color="yellow"
                                                    required
                                                    text
                                                ></v-text-field>

                                                <v-text-field
                                                    v-model="email"
                                                    prepend-icon="email"
                                                    :rules="emailRules"
                                                    :label="`${$t('email')}`"
                                                    color="yellow"
                                                    required
                                                    text
                                                ></v-text-field>

                                                <v-select
                                                    v-model="subject"
                                                    prepend-icon="subject"
                                                    :items="subjects"
                                                    :rules="subjectRules"
                                                    :label="`${$t('subject')}`"
                                                    color="yellow"
                                                    hide-selected
                                                    dark
                                                    chips
                                                    required
                                                    text
                                                ></v-select>
                                                <v-textarea
                                                    v-model="message"
                                                    prepend-icon="message"
                                                    :rules="messageRules"
                                                    color="yellow"
                                                    :label="`${$t('message')}`"
                                                    required
                                                    outlined
                                                    text
                                                >
                                                </v-textarea>
                                                <v-btn
                                                    :disabled="!valid"
                                                    color="yellow"
                                                    outlined
                                                    rith
                                                    text
                                                    nuxt
                                                    @click="submit"
                                                >
                                                    {{ $t('send') }}
                                                    <v-icon right dark>
                                                        send
                                                    </v-icon>
                                                </v-btn>
                                            </v-form>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-spacer />
                    <v-layout align-center justify-space-between class="pa-0">
                        <v-flex
                            xs12
                            md4
                            class="font-weight-light title white--text"
                            size="24px"
                            >&copy;2008 - 2019
                            <strong>3D Mriya, Inc</strong>
                        </v-flex>
                        <v-spacer />
                        <v-flex xs12 md8
                            ><v-btn
                                v-for="icon in icons"
                                :key="icon"
                                class="mx-1 socialFooter"
                                dark
                                icon
                            >
                                <font-awesome-icon
                                    :icon="['fab', `${icon}`]"
                                    style="font-size: 24px"
                                />
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-img>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import { VTextField, VSelect } from 'vuetify/lib';
export default {
    name: 'FooterComp',
    components: {
        VTextField,
        VSelect
    },
    props: {
        menus: {
            type: Object,
            required: true
        },
        subjects: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            icons: [
                'facebook-f',
                'twitter',
                'github',
                'google-plus-g',
                'pinterest',
                'instagram',
                'linkedin-in',
                'dribbble',
                'reddit-alien',
                'vimeo-v',
                'vk',
                'odnoklassniki',
                'youtube'
            ],
            valid: false,
            name: '',
            nameRules: [
                v => !!v || this.$t('name_is_required'),
                v =>
                    v.length >= 3 ||
                    this.$t('name_must_be_greater_than_3_characters')
            ],
            email: '',
            emailRules: [
                v => !!v || this.$t('email_is_required'),
                v =>
                    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
                        v
                    ) || this.$t('email_must_be_valid')
            ],
            subject: null,
            subjectRules: [v => !!v || this.$t('subject_is_required')],
            message: '',
            messageRules: [
                v => !!v || this.messageRulesRequired(),
                v =>
                    v.length >= 5 ||
                    this.$t('message_must_be_greater_than_5_characters')
            ],
            error: true,
            FinCards: [
                {
                    name: 'AmericanExpress',
                    image: 'American_express.png'
                },
                {
                    name: 'Bitcoin',
                    image: 'bitcoin.png'
                },
                {
                    name: 'PayPal',
                    image: 'paypal.png'
                },
                {
                    name: 'Western Union',
                    image: 'western.png'
                },
                {
                    name: 'Maestro',
                    image: 'master.png'
                },
                {
                    name: 'Visa',
                    image: 'visa.png'
                }
            ]
        };
    },
    methods: {
        messageRulesRequired() {
            return this.$t('message_is_required');
        },
        submit() {
            // if (this.$refs.form.validate()) {
            //     this.$store.dispatch('userJoin', {
            //         email: this.email,
            //         password: this.password
            //     })
            // }
        }
    }
};
</script>

<style scoped>
.footerTitle {
    color: rgba(115, 137, 148, 0.5);
}
.socialFooter {
    color: #e0f7fa;
}
.socialFooter:hover {
    color: yellow;
}
/*.footerBG {*/
/*    background: url('~assets/images/footerBG.jpg');*/
/*    background-size: cover;*/
/*    width: 100%;*/
/*    !*height: 100%;*!*/
/*    !*height: 100vh;*!*/
/*}*/
</style>
