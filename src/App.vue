<template>
    <v-app>
        <v-navigation-drawer
                app
                temporary
                dark
                v-model="drawer"
        ><v-list>
                <v-list-tile
                        @click=""
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                ><v-list-tile-action>
                </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app dark color="black" dense>
            <v-toolbar-side-icon
                    @click="drawer =!drawer"
                    class="hidden-md-and-up"
            ></v-toolbar-side-icon>
            <v-toolbar-items class="ml-4" justify-center>
                <router-link to="/" tag="span" class="pointer">
                    <img src='https://i.annihil.us/u/prod/misc/cards/2000px-MarvelLogo.png' height="48px" width="110px"/>
                </router-link>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down ml-3">
                <v-btn flat
                       v-for="link in links"
                       :key="link.title"
                       :to="link.url"
                >{{link.title}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>

        <v-footer app dark absolute>
            <v-layout justify-center> &copy;2019 </v-layout>
        </v-footer>

    </v-app>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        data() {
            return {
                drawer: false
            }
        },
        computed: {
            links() {
                return [
                    {title: 'Comics', icon: 'note_add', url: '/comics'},
                    {title: 'Characters', icon: 'list', url: '/characters'},
                ]
            }
        },
    }
</script>
