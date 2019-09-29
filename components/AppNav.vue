<template>
    <v-navigation-drawer
        fixed
        app
        dark
        color="#06242d"
        :permanent="$vuetify.breakpoint.mdAndUp"
        light
        :mini-variant.sync="$vuetify.breakpoint.mdAndUp && mini"
        :clipped="$vuetify.breakpoint.mdAndUp"
        :value="mini"
        :width="250"
    >
        <v-list class="py-0">
            <v-list-item>
                <v-list-item-icon v-show="$vuetify.breakpoint.mdAndUp && mini">
                    <v-btn
                        small
                        icon
                        class="mx-0"
                        @click.native.stop="navToggle"
                    >
                        <v-icon>chevron_right</v-icon>
                    </v-btn>
                </v-list-item-icon>
                <v-list-item-avatar color="grey darken-3" size="50px">
                    <v-img class="elevation-6" :src="gravatar" />
                </v-list-item-avatar>
                <div>&emsp;</div>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ user.name }}
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-btn
                        small
                        icon
                        class="mx-0"
                        @click.native.stop="navToggle"
                    >
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-item-icon>
            </v-list-item>
        </v-list>

        <v-list
            v-for="(group, index) in items"
            :key="index"
            class="py-0 mx-auto"
            dense
        >
            <v-divider
                v-if="group.length"
                class="mb-2"
                :class="{ 'mt-0': !index, 'mt-2': index }"
            />

            <template v-for="item in group">
                <v-list-group
                    v-if="!!item.items"
                    :key="item.title"
                    :prepend-icon="item.icon"
                    no-action
                    active-class="yellow--text"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ $t(item.title) }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="subItem in item.items"
                        :key="subItem.title"
                        :to="subItem.to"
                        ripple
                        :exact="
                            subItem.exact !== undefined ? subItem.exact : true
                        "
                        active-class="yellow--text"
                        @click="subItem.action ? subItem.action() : false"
                    >
                        <v-list-item-content class="pl-2">
                            <v-list-item-title>
                                {{ $t(subItem.title) }}
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                            <v-icon>{{ subItem.icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>

                <v-list-item
                    v-else
                    :key="item.title"
                    href="javascript:void(0)"
                    :to="item.to"
                    ripple
                    :exact="item.exact !== undefined ? item.exact : true"
                    active-class="yellow--text"
                    @click.native="item.action ? item.action() : false"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ $t(item.title) }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { Framework as $vuetify } from 'vuetify';
export default {
    name: 'AppNav',
    comments: {
        $vuetify
    },
    props: {
        mini: {
            type: Boolean,
            required: false,
            default: false
        }
    }
};
</script>

<style scoped></style>
