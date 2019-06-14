import Vue from 'vue';
import Vuex from 'vuex';
import characters from './characters';
import shared from './shared';
import comics from './comics';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      characters,
      shared,
      comics,
  }
})
