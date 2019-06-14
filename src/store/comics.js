import axios from 'axios';
import {public_key, server} from '../marvel-api';

export default {
    state: {
        comics:[],
        oneComics: [],
        characters: [],
    },
    getters: {
        getAllComics: state => state.comics.filter(item => item.images.length !== 0),
        getOneComics: state => state.oneComics,
        getListOfCharacters: state => state.characters,
        promoComics: state => state.comics.filter(item => item.images.length !== 0).slice(0, 6)

    },
    actions: {
        async fetchAllComics({commit}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const result = await axios.get(`${server}/v1/public/comics?limit=100&apikey=${public_key}`);
                commit('loadAllComics', result.data.data.results);
                commit('setLoading', false);

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }

        },
        async fetchComics({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const comics = await axios.get(`${server}/v1/public/comics/${payload}?apikey=${public_key}`);
                const characters = await axios.get(`${server}/v1/public/comics/${payload}/characters?apikey=${public_key}`);

                commit('clearState');
                commit('loadOneComics', comics.data.data.results);
                commit('loadListOfCharacters', characters.data.data.results);
                commit('setLoading', false);

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }

        },

    },
    mutations: {
        loadAllComics(state, payload) {
            state.comics = payload
        },
        loadOneComics(state, payload) {
            state.oneComics = payload
        },
        loadListOfCharacters(state, payload) {
            state.characters = payload
        },
        clearState(state) {
            state.characters = null
        }
    }
}