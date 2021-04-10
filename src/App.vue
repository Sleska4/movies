<template>
  <div id="app">
    <PosterBg :poster="posterBg"/>
    <div>
      <MoviesList :list="getMoviesList" @changePoster="onChangePoster"/>
      </div>
    <MoviesPagination
        :per-page="getMoviesPerPage"
        :current-page="getCurrentPage"
        :total="getTotal"
        @onChangePage="onChangePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'
import PosterBg from "@/components/PosterBg";
import MoviesPagination from "@/components/MoviesPagination";

export default {
  name: "app",
  components: {MoviesPagination, PosterBg, MoviesList},
  computed: {
    ...mapGetters("movies", ["getMoviesList", "getCurrentPage", "getMoviesPerPage", "getTotal"])
  },
  data(){
    return{
      posterBg: ""
    }
  },
  methods: {
    ...mapActions("movies", ["fetchMovies", "changeCurrentPage"]),
    onChangePoster(poster){
      this.posterBg = poster
    },
    onChangePage(page){
      this.$router.push({ query: {page} })
      this.changeCurrentPage(page);
    },
  },
  created() {
    if(this.$route.query.page) {
      this.changeCurrentPage(Number(this.$route.query.page));
    }
  }
}
</script>

<style>
#app{
  position: relative;
}
</style>
