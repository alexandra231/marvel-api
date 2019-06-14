<template>
    <v-container>
        <v-layout row justify-center v-if="!loading">
            <v-flex xs12 md6>
                <h1 align="center" class="display-3 font-weight-medium font-italic">Welcome to Marvel API</h1>
            </v-flex>
        </v-layout>
        <v-layout row justify-center v-if="!loading">
            <v-flex xs12 md9>
                <p align="middle" class="font-weight-light font-italic display-1">Discover the wonderful world of MARVEL!</p>
            </v-flex>
        </v-layout>
        <v-container align-content-center v-if="!loading">
            <v-layout justify-center row wrap>
                <v-flex xs12 md6>
                    <v-layout justify-center>
                        <router-link :to="'/characters/'" class="link">
                            <v-card width="300px" dark color="black" class="mb-1">
                                <h3 class="font-weight-medium display-2" align="center">Characters</h3>
                                <v-container  grid-list-md
                                              fill-height
                                              fluid
                                              ma-0
                                              pa-2
                                              class="hidden-xs-only"
                                >
                                    <v-layout row wrap ml-4>
                                        <v-flex  v-for="item in promoCharacters"
                                                 :key="item.title"
                                                 xs12 sm6 md6>
                                            <v-img
                                                    :src='`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`'
                                                    height="150px"
                                                    width="100px"
                                                    justify-center
                                            ></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </router-link>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md6>
                    <v-layout justify-center>
                        <router-link :to="'/comics/'" class="link">
                            <v-card width="300px" dark color="black">
                                <h3 class="font-weight-medium display-2" align="center">Comics</h3>
                                <v-container  grid-list-md
                                              fill-height
                                              fluid
                                              ma-0
                                              pa-2
                                              class="hidden-xs-only"
                                >
                                    <v-layout row wrap ml-4>
                                        <v-flex  v-for="item in promoComics"
                                                 :key="item.title"
                                                 xs12 sm6 md6>
                                                <v-img
                                                        :src='`${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`'
                                                        height="150px"
                                                        width="100px"
                                                        justify-center
                                                ></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </router-link>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
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
        name: "Home",

        created() {
            this.$store.dispatch('fetchAllComics');
            this.$store.dispatch('fetchAllCharacters');
        },

        computed: {

            loading() {
                return this.$store.getters.loading
            },

            promoComics() {
                return this.$store.getters.promoComics
            },

            promoCharacters() {
                return this.$store.getters.promoCharacters
            }
        }
    }
</script>

<style scoped>
.link {
    text-decoration: none;
}
</style>