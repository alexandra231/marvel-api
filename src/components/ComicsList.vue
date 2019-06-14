<template>
    <v-container>
        <v-layout justify-center v-if="!loading">
            <v-flex xs12>
                <v-container
                        grid-list-md
                        fill-height
                        fluid
                        ma-0
                        pa-0
                >
                    <v-layout row wrap>
                        <v-flex
                                v-for="item in comics"
                                :key="item.name"
                                xs12 sm6 md3
                        >
                            <v-hover>
                                <v-card :to="'/comics/' + item.id"
                                        slot-scope="{ hover }"
                                        :class="`elevation-${hover ? 24 : 5}`">
                                    <v-img
                                            :src='`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`'
                                    ></v-img>
                                </v-card>
                            </v-hover>

                            <v-container
                                    fluid
                                    pa-2
                            >
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <router-link :to="'/comics/' + item.id" class="comicsTitle">
                                            <span class="font-weight-black" v-text="item.title"></span>
                                        </router-link>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-layout row v-else>
            <v-flex>
                <div class="text-xs-center">
                    <v-progress-circular
                            :size="100"
                            :width="4"
                            color="red"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "Comics",

        computed: {
            comics() {
                return this.$store.getters.getAllComics;
            },
            loading() {
                return this.$store.getters.loading
            },
        }
    }
</script>

<style scoped>
    .comicsTitle:hover {
        color: red;
        cursor: pointer;
    }

    .comicsTitle {
        text-decoration: none;
        color: #000
    }
</style>