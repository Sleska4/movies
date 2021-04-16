<template>
  <header class="header">
    <BNavbar type="dark" variant="dark" class="navbar">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput
              debounce="500"
              class="mr-sm-2 search-input"
              placeholder="Search"
              v-model="searchValue"
          />
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      searchValue: ""
    }
  },
  watch: {
    searchValue: "onSearchValueChange"
  },
  methods: {
    ...mapActions("movies", ["searchMovies", "fetchMovies", "toggleSearchState"]),
    onSearchValueChange(val){
      if(val){
        this.searchMovies(val)
        this.toggleSearchState(true)
      } else{
        this.fetchMovies()
        this.toggleSearchState(false)
      }
    }
  }
}
</script>

<style scoped>
  .header{
    margin-bottom: 30px;
  }
  .navbar{
    background-color: rgba(0, 0, 0, 0.7) !important;
  }
  .search-input{
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 0, 0, 0.6);
  }
  .search-input:focus{
    box-shadow: none;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.6);
  }
</style>