<template>
    <v-container>
        <v-layout v-if="!loading" row wrap>
            <v-flex xs12 md4>
                <v-img
                        :src='`${getCharacter[0].thumbnail.path}/portrait_uncanny.${getCharacter[0].thumbnail.extension}`'
                        height="450px"
                        width="300px"
                        class="elevation-10"
                ></v-img>
            </v-flex>

            <v-flex xs12 md8>
                <h1 class="text--primary">{{getCharacter[0].name}}</h1>
                <p>{{getCharacter[0].description}}</p>
                <h2 v-if="getListOfComics.length !== 0 ">List of comics</h2>
                <ul v-for="item in getListOfComics">
                    <router-link :to="'/comics/' + item.id" class="link">{{item.title}}</router-link>
                </ul>
                <h2>List of links</h2>
                <ul v-for="item in getCharacter[0].urls">
                    <a :href="`${item.url}`" target="_blank" class="link">{{item.type}}</a>
                </ul>
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
        name: "Character",
        props: ['id'],

        created() {
            this.$store.dispatch('fetchCharacter', this.id);
        },

        computed: {
            getCharacter() {
                return this.$store.getters.getCharacter
            },

            loading() {
                return this.$store.getters.loading
            },

            getListOfComics() {
                return this.$store.getters.getListOfComics
            }
        }
    }
</script>

<style scoped>
    .link:hover {
        color: red;
        cursor: pointer;
    }

    .link {
        text-decoration: none;
        color: #000
    }

</style>