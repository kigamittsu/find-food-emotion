<template>
  <div id="app">
    <Upload @set-emotion="setEmotion" @set-highest-emotion="setHighestEmotion"/>
    <h2 v-if="highest.length !== 0">
      Now you are
      <span class="highest">{{highest}}</span>
    </h2>
    <Chart v-if="emotion.length !== 0" :emotion="emotion"/>
    <SearchRestaurant v-if="emotion.length !== 0" :highest="highest"/>
  </div>
</template>

<script>
import Upload from "./components/Upload.vue";
import Chart from "./components/Chart.vue";
import SearchRestaurant from "./components/SearchRestaurant.vue";

export default {
  name: "app",
  components: {
    Upload,
    Chart,
    SearchRestaurant
  },
  data: () => ({
    emotion: "",
    highest: ""
  }),
  methods: {
    setEmotion: function(value) {
      this.emotion = value;
    },
    setHighestEmotion: function(value) {
      this.highest = value;
    }
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
