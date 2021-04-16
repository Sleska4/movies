<template>
  <BContainer>
    <h3 class="list-title">{{listTitle}}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movies="movie"
                     @mouseover.native="onMouseOver(movie.Poster)"
                     @removeItem="onRemoveItem"/>
        </BCol>
      </template>
      <template v-else>
        <div>Empty list</div>
      </template>
    </BRow>
  </BContainer>
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
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    onMouseOver(poster){
      this.$emit("changePoster", poster)
    },
    async onRemoveItem({ id, title }){
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}?`);
      if(isConfirmed){
        this.removeMovie(id)
      }
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
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #FFF;
}
</style>