<template>
    <v-container fluid grid-list-lg>
        <v-layout row justify-center>
            <v-flex xs12 class="text-center display-1 font-weight-lite my-5">
                {{ title }}
            </v-flex>
        </v-layout>
        <v-container fluid grid-list-md>
            <v-layout row wrap align-space-around fill-height>
                <v-flex
                    v-for="(step, i) in steps"
                    :key="step.name"
                    xs12
                    sm12
                    md4
                >
                    <v-hover>
                        <v-card
                            slot-scope="{ hover }"
                            :class="`elevation-${hover ? 12 : 2}`"
                            class="mx-auto"
                            height="100%"
                        >
                            <v-img
                                class="white--text"
                                :src="
                                    require('~/assets/images/' +
                                        `${step.image}`)
                                "
                                contain
                                position="start center"
                            >
                                <v-card-title
                                    class="align-end justify-center fill-height text-capitalize"
                                >
                                    {{ items[step.id + 0] }}
                                </v-card-title>
                            </v-img>
                            <template
                                class="column align-center justify-lg-space-between"
                            >
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="headline mb-1 text-capitalize"
                                        >
                                            {{ items[step.id + 1] }}
                                        </v-list-item-title>
                                        <p
                                            class="text-justify font-weight-light"
                                        >
                                            &emsp;&emsp;{{ text[i] }}
                                        </p>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider />
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn
                                        v-scroll-to="'#' + step.title"
                                        outlined
                                        color="orange"
                                        depressed
                                        nuxt
                                    >
                                        {{ items[step.id + 2] }}
                                    </v-btn>
                                </v-card-actions>
                            </template>
                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
// import { VBanner } from 'vuetify/lib'
export default {
    name: 'HomeProduceSteps',
    // components: {
    //     VBanner
    // },
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default() {
                return [];
            }
        },
        text: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            // title: 'Home Page Produce Steps',
            steps: [
                {
                    id: 0,
                    title: 'Modeling',
                    image: 'MasaratyGride.jpg'
                },
                {
                    id: 3,
                    title: 'Printing',
                    image: 'MasaratyPrint.jpg'
                },
                {
                    id: 6,
                    title: 'Painting',
                    image: 'MasaratyPaint.jpg'
                }
            ]
        };
    },
    methods: {
        showRecipes(plan) {
            // this.$store.dispatch('getRecipes', plan)
            return [];
        }
    }
};
</script>

<style scoped>
.list-content {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 100%;
}
/*.list-content p {*/
/*    flex: 1 0 auto;*/
/*}*/
/*.border {*/
/*    border: solid 1px #999;*/
/*}*/
/*.flex {*/
/*    flex: 0 1 auto;*/
/*}*/
/*.grow {*/
/*    flex-grow: 1;*/
/*}*/
</style>
