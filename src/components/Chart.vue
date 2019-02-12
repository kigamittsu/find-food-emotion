<script>
import { Radar } from "vue-chartjs";
export default {
  extends: Radar,
  props: ["emotion", "options"],
  mounted() {
    this.renderRaderChart();
  },
  methods: {
    renderRaderChart: function() {
      this.renderChart(
        {
          labels: [
            "anger",
            "contempt",
            "disgust",
            "fear",
            "happiness",
            "neutral",
            "sadness",
            "surprise"
          ],
          datasets: [
            {
              label: "Your Emotion",
              backgroundColor: "rgba(0, 216, 255, .3)",
              borderColor: "rgba(0, 216, 255, .8)",
              borderWidth: 1,
              pointBackgroundColor: "#fff",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [
                this.emotion.anger,
                this.emotion.contempt,
                this.emotion.disgust,
                this.emotion.fear,
                this.emotion.happiness,
                this.emotion.neutral,
                this.emotion.sadness,
                this.emotion.surprise
              ]
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#emotionChart {
  width: 400px;
  height: 400px;
}
</style>
