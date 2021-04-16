<template>
  <div v-if="isShowLoader" class="loader">
    <b-spinner style="width: 20rem; height: 20rem; color: white;" label="Large Spinner"></b-spinner>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Loader",
  computed: {
    ...mapGetters(["isShowLoader"])
  }
}
</script>

<style scoped>
  .loader{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
</style>