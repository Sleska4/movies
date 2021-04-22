<template>
  <div class="movies-list-end">
    <BContainer>
      <h3 class="list-title">{{listTitle}}</h3>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem :movies="movie"
                       @mouseover.native="onMouseOver(movie.Poster)"
                       @removeItem="onRemoveItem"
                       @showModal="onShowMovieInfo"
            />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
      <BModal :id="movieInfoModalId" size="xl" hide-footer hide-header>
        <p>Text</p>
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import MovieItem from "@/components/MovieItem";
import {mapActions, mapGetters} from "vuex";
export default {
name: "MoviesList",
  components: {MovieItem},
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return{
      movieInfoModalId: "movie-info"
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster){
      this.$emit("changePoster", poster)
    },
    async onRemoveItem({ id, title }){
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}?`);
      if(isConfirmed){
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successful",
          variant: "success",
          title: "Success",

        })
      }
    },
    onShowMovieInfo(id){
      this.$bvModal.show(this.movieInfoModalId)
    }
  },
  computed: {
  ...mapGetters("movies", ["getIsSearch"]),
  isExist(){
    return Boolean(Object.keys(this.list).length)
    },
  listTitle() {
    return this.getIsSearch ? "Search result" : "IMDB Top 250"
  }
  }
}
</script>

<style scoped>
.movies-list-end{
  margin-bottom: 30px;
}
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #FFF;
}
</style>