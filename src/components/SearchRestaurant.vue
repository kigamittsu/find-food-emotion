<template>
  <div class="search-restaurant-wrapper">
    <button class="btn">
      Search
      <span class="highest">{{highest}}</span> Restaurants
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "searchRestaurant",
  props: ["highest"],
  methods: {
    getRestrants: function() {
      axios({
        method: "get",
        url: "/api/restaurants",
        crossorigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
