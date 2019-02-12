<template>
  <ul>
    <li class="list-item" v-for="result in restaurants" :key="result.id">
      <img :src="result.thumbnail">
      <a :href="result.url">{{result.name}}</a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "list-item",
  props: ["restaurants"]
};
</script>
<style scoped>
</style>


