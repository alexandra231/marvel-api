import axios from 'axios';
import {public_key, server} from '../marvel-api';

export default {
    state: {
        characters: [],
        oneCharacter: [],
        comics: [],
    },
    getters: {
        getAllCharacters: state => state.characters.filter(item => item.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"),
        getCharacter: state => state.oneCharacter,
        getListOfComics: state => state.comics,
        promoCharacters: state => state.characters.filter(item => item.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available").slice(0, 6)

    },
    actions: {
        async fetchAllCharacters({commit}) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const result = await axios.get(`${server}/v1/public/characters?limit=99&apikey=${public_key}`);
                commit('loadAllCharacters', result.data.data.results);
                commit('setLoading', false);

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }

        },

        async fetchCharacter({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const character = await axios.get(`${server}/v1/public/characters/${payload}?apikey=${public_key}`);
                const comics = await axios.get(`${server}/v1/public/characters/${payload}/comics?apikey=${public_key}`);

                commit('clearState');
                commit('loadCharacter', character.data.data.results);
                commit('loadListOfComics', comics.data.data.results);
                commit('setLoading', false);

            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error;
            }

        },

    },
    mutations: {
        loadAllCharacters(state, payload) {
            state.characters = payload
        },
        loadCharacter(state, payload) {
            state.oneCharacter = payload
        },
        loadListOfComics(state, payload) {
            state.comics = payload
        },
        clearState(state) {
            state.comics = null
        }
    }
}