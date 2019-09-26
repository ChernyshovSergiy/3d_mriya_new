<template>
    <div class="home mt-5">
        <home-start-screen :massage="massageMain" />
        <home-introduction
            :headline="headline"
            :sub-headline="subHeadline"
            :text="splitText"
        />
        <home-produce-steps
            :title="cardMassage"
            :items="splitCardItems"
            :text="splitCardText"
        />
        <!--        <modeling :text="splitModelingText" />-->
        <modeling :title="ModelingTitle" :text="ModelingTexts" />
        <modeling-fons />
        <printing
            :title="PrintingTitle"
            :text="PrintingText"
            :countries="countryList"
        />
        <printing-fons />
        <painting :title="PaintingTitle" :text="PaintingText" />
        <!--        <no-ssr>-->
        <swiper-images-carousel2 />
        <!--        </no-ssr>-->
        <v-layout row>
            <v-flex
                xs12
                class="text-xs-center display-1 font-weight-lite my-5"
                >{{ $t('down_massage') }}</v-flex
            >
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios';
import HomeStartScreen from '~/components/HomeStartScreen.vue';
import HomeIntroduction from '~/components/HomeIntroduction.vue';
import HomeProduceSteps from '~/components/HomeProduceSteps.vue';
import Modeling from '~/components/Modeling.vue';
import ModelingFons from '~/components/ModelingFons.vue';
import Printing from '~/components/Printing.vue';
import PrintingFons from '~/components/PrintingFons.vue';
import Painting from '~/components/Painting.vue';
import SwiperImagesCarousel2 from '~/components/SwiperImagesCarousel2.vue';

export default {
    name: 'Home',
    components: {
        HomeStartScreen,
        HomeIntroduction,
        HomeProduceSteps,
        Modeling,
        ModelingFons,
        Printing,
        PrintingFons,
        Painting,
        SwiperImagesCarousel2
    },
    data() {
        return {
            massageMain: '',
            headline: '',
            subHeadline: '',
            texts: '',
            cardMassage: '',
            cardItems: '',
            cardTexts: '',
            ModelingTitle: '',
            ModelingTexts: '',
            PrintingTitle: '',
            PrintingText: '',
            PaintingTitle: '',
            PaintingText: '',
            countryList: [],
            title: 'We will deliver your order on time to anywhere in the world'
        };
    },
    computed: {
        genKey() {
            return Math.floor(Math.random() * 1000000000);
        },
        splitText: function() {
            return this.texts.split('|');
        },
        splitCardItems: function() {
            return this.cardItems.split('|');
        },
        splitCardText: function() {
            return this.cardTexts.split('|');
        },
        splitModelingText: function() {
            return this.ModelingTexts.split('|');
        }
    },
    created: async function() {
        try {
            const apiUrl1 = process.env.baseUrl + '/page/contents';
            const apiUrl2 = process.env.baseUrl + '/order/countries';
            const cLang = this.$i18n.locale;
            const res = await axios.post(apiUrl1, {
                language: cLang
            });
            const countries = await axios.get(apiUrl2 + '/' + cLang);

            this.massageMain = res.data.data.home_screen_massage.headline;
            this.headline = res.data.data.who_are_this_site_for.headline;
            this.subHeadline = res.data.data.who_are_this_site_for.sub_headline;
            this.texts = res.data.data.who_are_this_site_for.text;
            this.cardMassage = res.data.data.card_steps.headline;
            this.cardItems = res.data.data.card_steps.sub_headline;
            this.cardTexts = res.data.data.card_steps.text;
            this.ModelingTitle = res.data.data.modeling_text.headline;
            this.ModelingTexts = res.data.data.modeling_text.text;
            this.PrintingTitle = res.data.data.printing_text.headline;
            this.PrintingText = res.data.data.printing_text.text;
            this.PaintingTitle = res.data.data.painting_text.headline;
            this.PaintingText = res.data.data.painting_text.text;
            this.countryList = countries.data.data;
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        reset() {
            this.$store.dispatch('order/clearOrderModelingErrors');
        }
    }
};
</script>
