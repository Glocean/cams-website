<template>
  <div class="about">
    <li v-for="item in answer" :key="item.title">
      {{ item.Title }}
    </li>
    <div>{{ answer }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameView",
  data() {
    return {
      answer: {},
    }
  },
  methods: {
    async getAnswer() {
      const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:H?key='+process.env.VUE_APP_API_KEY
      console.log(request)
      const { data } = await axios.get(request);
      console.log(data)
      var input = data.values
      const keys = ["Title", "Completion", "Finished Date", "Hours", "Genre", "Rating", "Reccomend", "Return"];
      this.answer = input.reduce(function(acc, cur, i) {
        var test = cur.reduce(function(acc, cur, i) {
          acc[keys[i]] = cur;
          return acc;
        }, {});
        acc[i] = test;
        return acc;
      }, []);
    }
  },
  beforeMount() {
    this.getAnswer();
  },
};
</script>