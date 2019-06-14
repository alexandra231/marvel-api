<template>
    <v-container>
        <v-layout justify-end v-if="!loading">
            <v-flex xs12 sm6 md3>
                <v-text-field
                        v-model="search"
                        label="Search"
                        color="red"
                >
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center v-if="!loading">
            <v-flex xs12>
                <v-container
                        fluid
                        grid-list-md
                        fill-height
                        ma-0
                        pa-0
                >
                    <v-layout row wrap>
                        <v-flex
                                v-for="item in paginatedData"
                                :key="item.name"
                                xs6 sm3 md2
                        >
                            <v-hover>
                                <v-card :to="'/characters/' + item.id"
                                        slot-scope="{ hover }"
                                        :class="`elevation-${hover ? 24 : 5}`">
                                    <v-img
                                            :src='`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`'
                                    ></v-img>
                                </v-card>
                            </v-hover>
                            <v-container
                                    fluid
                                    pa-2
                            >
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <router-link :to="'/characters/' + item.id" class="characterTitle">
                                            <span class="font-weight-black" v-text="item.name"></span>
                                        </router-link>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-layout justify-center v-if="!loading">
            <v-flex xs12 sm6 md4>
                <div class="text-xs-center mt-6">
                    <v-pagination
                            v-model="page"
                            :length="this.pageCount"
                            color="red"
                    ></v-pagination>
                </div>
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
        data() {
            return {
                page: 1,
                size: 12,
                search: '',
            }
        },

        computed: {
            characters() {
                return this.$store.getters.getAllCharacters;
            },
            loading() {
                return this.$store.getters.loading
            },
            pageCount() {
                let l = this.searchByName.length,
                    s = this.size;
                return Math.ceil(l / s);
            },
            paginatedData() {
                const start = (this.page - 1) * this.size;
                const end = start + this.size;
                return this.searchByName.slice(start, end);
            },
            searchByName() {
                return this.characters.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
            },
        },

    }
</script>

<style scoped>
    .characterTitle:hover {
        color: red;
        cursor: pointer;
    }

    .characterTitle {
        text-decoration: none;
        color: #000
    }
</style>