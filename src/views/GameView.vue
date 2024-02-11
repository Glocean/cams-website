<template>
  <div class="games">
    <div class="flex flex-column align-items-center justify-content-center m-5">
      <div class="flex flex-row align-items-center justify-content-center flex-wrap m-2">
        <GameTable :gameData="games" :loading="loading"/>
        <CurrentlyPlaying :gameData="games"/>
      </div>
      <!--<div>{{ games }}</div>-->
    </div>
  </div>
</template>

<script>
// TODO: "Currently Playing" carousel that shows what I'm currently playing with pictures and stuff
// https://primevue.org/carousel/
// You can create the path to steam header pictures if you know the steam app id

// TODO: Maybe remove backlog from main table and create a second table that's just the backlog

import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import GameTable from "@/components/GameTable.vue";
import CurrentlyPlaying from "@/components/CurrentlyPlaying.vue";

export default {
  name: "GameView",
  components: {
    GameTable,
    CurrentlyPlaying,
  },
  data() {
    return {
      games: null,
      customers: null,
      filters: null,
      statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
      ratings: ['Bad', 'Ok', 'Good', 'Great', 'Love'],
      loading: true,
      expandedRows: []
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
  },
  methods: {
    async getGames() {
      const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:J?key='+process.env.VUE_APP_API_KEY
      console.log(request)
      const { data } = await axios.get(request);
      var input = data.values
      const keys = ["title", "completion", "date", "hours", "genre", "rating", "reccomend", "return", "steamId", "icon"];
      console.log(data.values)
      this.games = input.reduce(function(acc, cur, i) {
        var test = cur.reduce(function(acc, cur, i) {
          acc[keys[i]] = cur;
          return acc;
        }, {});
        acc[i] = test;
        return acc;
      }, []);
      this.loading = false;
    },
    formatTags(value) {
       return value.split(",");
    },
    formatCurrency(value) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        completion: { value: ['Finished', '100%', 'Abandoned'], matchMode: FilterMatchMode.IN },
        rating: { value: null, matchMode: FilterMatchMode.IN },
      };
    },
    getCustomers(data) {
      return [...(data || [])].map((d) => {
        d.date = new Date(d.date);
        return d;
      });
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
    getRatingSeverity(status) {
      switch (status) {
        
        case 'Bad':
          return 'danger';
        
        case 'Ok':
          return 'warning';
        
        case 'Good':
          return 'secondary';
        
        case 'Great':
          return 'info';

        case 'Love':
          return 'success'; 
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

.games {
  display: grid;
  height: -webkit-fill-available;
  width: 100%;
}

</style>