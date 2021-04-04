<template>
  <div id="app">
    <div>
      <MoviesList :list="getMoviesList"/>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '@/components/MoviesList'

export default {
  name: "app",
  components: {MoviesList},
  computed: {
    ...mapGetters("movies", ["getMoviesList"])
  },
  mounted() {
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"])
  },
}
</script>

<style>

</style>
