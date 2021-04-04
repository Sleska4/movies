<template>
  <div id="app">
    <PosterBg :poster="posterBg"/>
    <div>
      <MoviesList :list="getMoviesList" @changePoster="onChangePoster"/>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'
import PosterBg from "@/components/PosterBg";

export default {
  name: "app",
  components: {PosterBg, MoviesList},
  computed: {
    ...mapGetters("movies", ["getMoviesList"])
  },
  mounted() {
  },
  data(){
    return{
      posterBg: ""
    }
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
    onChangePoster(poster){
      this.posterBg = poster
    }
  },
}
</script>

<style>
#app{
  position: relative;
}
</style>
