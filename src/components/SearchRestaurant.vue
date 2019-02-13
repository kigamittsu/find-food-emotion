<template>
  <div class="search-restaurant-wrapper">
    <button @click="getRestrants" class="btn getRestaurants">
      Search
      <span class="highest">{{highest}}</span> Restaurants
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "searchRestaurant",
  props: ["highest", "restaurants"],
  methods: {
    // getRestrantsWithEmotion: function() {
    //   this.getRestrants();
    // },
    getRestrants: function() {
      // let emotion = "";
      // switch (this.highest) {
      //   case "anger": {
      //     emotion = "Angry";
      //     break;
      //   }
      //   case "neutral": {
      //     emotion = "Bored";
      //     break;
      //   }
      //   case "contempt": {
      //     emotion = "Fear";
      //     break;
      //   }
      //   case "disgust": {
      //     emotion = "Excited";
      //     break;
      //   }
      //   case "fear": {
      //     emotion = "Fear";
      //     break;
      //   }
      //   case "happiness": {
      //     emotion = "Happy";
      //     break;
      //   }
      //   case "sadness": {
      //     emotion = "Sad";
      //     break;
      //   }
      //   case "surprise": {
      //     emotion = "Excited";
      //     break;
      //   }
      // }
      axios({
        method: "get",
        url: "/api/restaurants",
        crossorigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        params: {
          emotion: this.highest
        }
      })
        .then(response => {
          this.$emit("set-restaurants", response.data);
        })
        .catch(err => {
          console.log(err);
        });
      // .then(result => {
      //   const target = result.reduce((accumulator, currentValue) => {
      //     accumulator.push(currentValue.name);
      //     return accumulator;
      //   }, []);
      //   axios({
      //     method: "post",
      //     url: "/api/emotions",
      //     crossorigin: true,
      //     headers: {
      //       "Access-Control-Allow-Origin": "*"
      //     },
      //     data: {
      //       restaurantInfo: target
      //     }
      //   })
      //     .then(result => {
      //       this.$emit("set-restaurants-emotions", result.data);
      //       return result.data;
      //     })
      //     .then(result => {
      //       this.$emit("filter-restaurants", result.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // });
    }
    // getEmotion: function() {
    //   const target = this.restaurants.reduce((accumulator, currentValue) => {
    //     return accumulator.push(currentValue.name);
    //   }, []);
    //   axios({
    //     method: "post",
    //     url: "/api/restaurants/emotions",
    //     crossorigin: true,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //     data: {
    //       restaurantInfo: target
    //     }
    //   }).then(result => {
    //     console.log(result);
    //   });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.getRestaurants {
  width: 350px;
}
.search-restaurant-wrapper {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
