<template>
  <div id="app">
    <div>
      <b-button>Button</b-button>
      <b-button variant="danger">Button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "app",
  comments: {},
  mounted() {
    this.fetchMovies()
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"])
  },
}
</script>

<style>

</style>
