import IDs from "@/store/mock/imdb_top250"
import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializeResponse(movies){
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie
    return acc
  }, {})
}
const { MOVIES, CURRENT_PAGE } = mutations;
const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 16,
    moviesCurrentPage: 1,
    movies: {}
  },
  getters: {
    getMoviesList: ({ movies }) => movies,
    sliceIds: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    getCurrentPage: ({moviesCurrentPage }) => moviesCurrentPage,
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getTotal: ({ top250IDs }) => Object.keys(top250IDs).length
  },
  mutations: {
    [CURRENT_PAGE](state, value) {
      state.moviesCurrentPage = value
    },
    [MOVIES](state, value) {
      state.movies = value
    }
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }){
        dispatch("fetchMovies")
      },
      root: true
    },
    async fetchMovies({ getters, commit }) {
      try {
        const {getCurrentPage, getMoviesPerPage, sliceIds} = getters;
        const from = getCurrentPage * getMoviesPerPage - getMoviesPerPage;
        const to = getCurrentPage * getMoviesPerPage;
        const moviesToFetch = sliceIds(from, to);

        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`))
        const response = await Promise.all(requests)
        const movies = serializeResponse(response)

        commit(MOVIES, movies)
      }catch (err){
        console.log(err)
      }
    },
    changeCurrentPage( {commit, dispatch}, page ) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies")
    }
  }
};

export default moviesStore;
