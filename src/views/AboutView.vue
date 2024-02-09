<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ answer }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutView",
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
      this.answer = data.values
    }
  },
  beforeMount() {
    this.getAnswer();
  },
};
</script>