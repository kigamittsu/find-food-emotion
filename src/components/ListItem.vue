<template>
  <div class="list">
    <div class="list-item" v-for="result in restaurants" :key="result.id">
      <img :src="result.thumbnail">
      <a :href="result.url">{{result.name}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "list-item",
  props: ["restaurants"]
};
</script>
<style scoped>
.list {
  text-align: left;
  margin-left: 25%;
  margin-right: 25%;
}
.list img {
  width: 80px;
  height: 80px;
}
.list a {
  vertical-align: top;
  font-size: 1.5em;
  margin-left: 5%;
}
</style>


