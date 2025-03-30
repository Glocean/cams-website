<template>
    <div class="timeline">
        Tineline
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Timeline",
    components: {
    },
    data() {
      return {
        games: null,
        currentlyPlaying: [],
        backlog: [],
        filters: null,
        statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
        ratings: ['Bad', 'Ok', 'Good', 'Great', 'Love'],
        loading: true,
        expandedRows: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      async getGames() {
        this.loading = true;
        this.games = null;
        this.currentlyPlaying = [];
        this.backlog = [];
        const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:K?key='+import.meta.env.VITE_API_KEY
        const { data } = await axios.get(request);
        var input = data.values
        const keys = ["title", "completion", "date", "hours", "genre", "rating", "reccomend", "return", "steamId", "icon", "notes"];
        this.games = input.reduce(function(acc, cur, i) {
          var test = cur.reduce(function(acc, cur, i) {
            acc[keys[i]] = cur;
            return acc;
          }, {});
          acc[i] = test;
          return acc;
        }, []);
        this.loading = false;
        this.games.forEach((item) => {
          if (item.completion == "In Progress") {
            this.currentlyPlaying.push(item)
          }else if (item.completion == "Backlog") {
            this.backlog.push(item)
          }
        });
      },
      formatTags(value) {
         return value.split(",");
      },
      getSeverity(status) {
        switch (status) {
          
          case 'Abandoned':
            return 'danger';
          
          case 'Finished':
            return 'success';
          
          case 'Backlog':
            return 'info';
          
          case 'In Progress':
            return 'warning';
          
        }
      },
      getIconUrl(data) {
        var id = data.steamId;
        var hash = data.icon;
        var icon = "http://media.steampowered.com/steamcommunity/public/images/apps/"+id+"/"+hash+".jpg";
        return icon;
      },
      getBannerUrl(data) {
        var id = data.steamId;
        var banner = "https://cdn.akamai.steamstatic.com/steam/apps/"+id+"/header.jpg";
        return banner;
      }
    },
    beforeMount() {
      this.getGames();
    },
  };
  </script>
  
  <style scoped>
  
  .timeline {
    display: grid;
    height: -webkit-fill-available;
    width: 100%;
    place-items: center;
  }
  
  </style>