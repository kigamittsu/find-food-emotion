<template>
  <div id="app">
    <Upload @set-emotion="setEmotion" @set-highest-emotion="setHighestEmotion"/>
    <h2 v-if="highest.length !== 0">
      Now you are
      <span class="highest">{{highest}}</span>
    </h2>
    <Chart v-if="emotion.length !== 0" :emotion="emotion"/>
    <SearchRestaurant
      v-if="emotion.length !== 0"
      :highest="highest"
      :restaurants="restaurants"
      @set-restaurants="setRestaurants"
    />
    <List v-if="restaurants.length !== 0" :restaurants="restaurants"/>
  </div>
</template>

<script>
import Upload from "./components/Upload.vue";
import Chart from "./components/Chart.vue";
import SearchRestaurant from "./components/SearchRestaurant.vue";
import List from "./components/List.vue";

export default {
  name: "app",
  components: {
    Upload,
    Chart,
    SearchRestaurant,
    List
  },
  data: () => ({
    emotion: "",
    highest: "",
    restaurants: []
  }),
  methods: {
    setEmotion: function(value) {
      this.emotion = value;
    },
    setHighestEmotion: function(value) {
      this.highest = value;
    },
    setRestaurants: function(rests) {
      this.restaurants = rests;
    }
    // setRestaurantsEmotions: function(emotions) {
    //   for (let i = 0; i < emotions.length; i++) {
    //     this.restaurants[i].emotion = emotions[i];
    //   }
    // },
    // filterRestaurants: function() {
    //   switch (this.highest) {
    //     case "anger": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Anger";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "neutral": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Bored";
    //       });
    //       this.searchResults = filtered.slice();
    //       break;
    //     }
    //     case "contempt": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Fear";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "disgust": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Excited";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "fear": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Fear";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "happiness": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Happy";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "sadness": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Sad";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //     case "surprise": {
    //       const filtered = this.restaurants.filter(restaurant => {
    //         return restaurant.emotion.key === "Excited";
    //       });
    //       this.searchResults = filtered;
    //       break;
    //     }
    //   }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.highest {
  color: #ff1414;
}
</style>
