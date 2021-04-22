/* eslint-disable */
<template>
  <div class="movie-item mb-3">
      <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-info-wrap">
      <div class="movie-item-info">
          <h3 class="movie-title">{{ movies.Title }}</h3>
          <span class="movie-year">{{ movies.Year }}</span>
        </div>
        <div class="movie-item-controls row no-gutters">
          <div class="col pr-2">
            <BButton size="md" block variant="outline-light"
                      @click="showInfoModalEvent"
            >Info</BButton>
          </div>
          <div class="col pl-2">
            <BButton size="md"
                     block variant="outline-light"
                     @click="emitRemoveMovie">Remove</BButton>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movies: {
      type: Object,
      require: true
    }
  },
  methods: {
    emitRemoveMovie(){
      this.$emit("removeItem", {id: this.movies.imdbID, title: this.movies.Title})
    },
    showInfoModalEvent(){
      this.$emit("showModal", this.movies.imdbID)
    }
  },
  computed: {
    posterBg(){
      return {
        "background-image": `url(${this.movies.Poster})`
      }
    }
  }
}
</script>

<style scoped>
.movie-item{
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease-in;
  height: 400px;
}
.movie-item:hover {
  box-shadow: 0 5px 30px rgba(0,0,0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-origin: content-box;
  z-index: -1;
}
.movie-info-wrap{
  padding: 20px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.3s ease-in;
}
.movie-item:hover .movie-info-wrap{
  opacity: 1;
  background-color: rgba(0,0,0, 0.7);
  transition: all 0.3s;
}
.movie-title{
  font-size: 20px;
  color: #fff;
}
.movie-year{
  font-size: 14px;
  color: #fff;
}
</style>