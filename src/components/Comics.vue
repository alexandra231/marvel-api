<template>
    <v-container>
        <v-layout v-if="!loading" row wrap>
            <v-flex xs12 md4>
                <v-img
                        :src='`${getOneComics[0].thumbnail.path}/portrait_uncanny.${getOneComics[0].thumbnail.extension}`'
                        height="450px"
                        width="300px"
                        class="elevation-10"
                ></v-img>
            </v-flex>

            <v-flex xs12 md8>
                <h1 class="text--primary">{{getOneComics[0].title}}</h1>
                <p>{{getOneComics[0].description}}</p>
                <h2 v-if="getListOfCharacters.length !== 0 ">List of characters</h2>
                <ul v-for="item in getListOfCharacters">
                    <router-link :to="'/characters/' + item.id " class="link">{{item.name}}</router-link>
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
        name: "Comics",
        props: ['id'],

        created() {
            this.$store.dispatch('fetchComics', this.id);
        },

        computed: {
            getOneComics() {
                return this.$store.getters.getOneComics
            },

            loading() {
                return this.$store.getters.loading
            },
            getListOfCharacters() {
                return this.$store.getters.getListOfCharacters
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