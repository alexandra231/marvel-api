import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import CharactersList from './components/CharactersList'
import ComicsList from './components/ComicsList'
import Character from './components/Character'
import Comics from './components/Comics'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/comics',
            name: 'comicsList',
            component: ComicsList
        },
        {
            path: '/characters',
            name: 'characters',
            component: CharactersList
        },
        {
            path: '/characters/:id',
            props: true,
            name: 'character',
            component: Character
        },
        {
            path: '/comics/:id',
            props: true,
            name: 'comics',
            component: Comics
        }
    ]
})
