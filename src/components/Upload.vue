<template>
  <div class="upload-btn-wrapper">
    <button class="btn">Upload a file</button>
    <input @change="(event) => setUploadImage(event)" type="file" name="uploadfile">
    <div v-if="photoImage.length !== 0">
      <img :src="photoImage" class="upload-image">
      <button @click="postFaceAPI" class="btn submit">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "upload",
  data: () => ({
    photoInfo: null,
    photoImage: ""
  }),
  props: ["emotion", "highest"],
  methods: {
    setUploadImage: function(event) {
      this.photoInfo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.photoImage = e.target.result;
      };
      reader.readAsDataURL(this.photoInfo);
    },
    postFaceAPI: function() {
      axios({
        method: "post",
        url: "/api/upload",
        crossorigin: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        data: {
          photo: this.photoImage
        }
      })
        .then(response => {
          this.setResult(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setResult: function(emotion) {
      Object.keys(emotion).map((key, index) => {
        emotion[key] = (emotion[key] * 100).toFixed(1);
      });
      const highest = Object.keys(emotion).reduce((a, b) =>
        emotion[a] > emotion[b] ? a : b
      );
      this.$emit("set-emotion", emotion);
      this.$emit("set-highest-emotion", highest);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.upload-image {
  width: 300px;
  height: 400px;
  display: block;
}
</style>
