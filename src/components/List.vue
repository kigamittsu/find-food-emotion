<template>
  <div class="search-results">
    <ListItem :restaurants="restaurants"/>
  </div>
</template>
<script>
import ListItem from "./ListItem.vue";
export default {
  name: "list",
  components: {
    ListItem
  },
  props: ["restaurants"]
};
</script>
<style scoped>
</style>


