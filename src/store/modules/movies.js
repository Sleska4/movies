import IDs from '@/store/mock/imdb_top250';
import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}
const {
  MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH,
} = mutations;
const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 16,
    moviesCurrentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    getMoviesList: ({ movies }) => movies,
    sliceIds: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    getCurrentPage: ({ moviesCurrentPage }) => moviesCurrentPage,
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getTotal: ({ top250IDs }) => Object.keys(top250IDs).length,
    getIsSearch: ({ isSearch }) => isSearch,
  },
  mutations: {
    [CURRENT_PAGE](state, value) {
      state.moviesCurrentPage = value;
    },
    [MOVIES](state, value) {
      state.movies = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    },
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { getCurrentPage, getMoviesPerPage, sliceIds } = getters;
        const from = getCurrentPage * getMoviesPerPage - getMoviesPerPage;
        const to = getCurrentPage * getMoviesPerPage;
        const moviesToFetch = sliceIds(from, to);

        const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);

        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch('fetchMovies');
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex((el) => el === id);
      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchMovies');
      }
    },
    async searchMovies({ commit, dispatch }, query) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${query}`);
        if (response.Error) {
          throw Error(response.Error);
        }

        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies);
      } catch (err) {
        dispatch('showNotify', {msg: err.message, title: 'Error', variant: 'danger'}, {root: true})
      } finally {
        dispatch('toggleLoader', false, { root: true });
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool);
    },
  },
};

export default moviesStore;
