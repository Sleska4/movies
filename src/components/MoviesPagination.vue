<template>
  <div class="movie-pagination">
    <BPagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
      prev-text="Prev"
      next-text="Next"
    />
    {{this.currentPage}}
  </div>
</template>

<script>
export default {
  name: "MoviesPagination",
  props: {
      currentPage: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1
      },
      perPage: {
        type: Number,
        default: 1
      }
  },
  computed: {
    currentPageModel: {
      get(){
        return this.currentPage
      },
      set(value){
        this.$emit("onChangePage", value)
      }
    }
  }
}
</script>

<style scoped>
.movie-pagination{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.movie-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.movie-pagination >>> .pagination .page-item.active .page-link {
  background-color: #fff;
  color: #000;
  border-color: #fff;
}
.movie-pagination >>> .pagination .page-item.disabled .page-link {
  color: lightgray;

}

</style>