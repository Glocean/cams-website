<template>
  <div class="games">
    <div class="flex align-items-center justify-content-around flex-wrap">
      <div class="flex m-8">
        <GameTable :gameData="games" :loading="loading" @refresh-data="getGames"/>
      </div>
      <div class="flex justify-content-center flex-column m-8 h-full flex-wrap">
        <div class="flex align-items-center justify-content-center">
          <CurrentlyPlaying :gameData="currentlyPlaying"/>
        </div>
        <div class="flex align-items-center justify-content-center">
          <BacklogTable :gameData="backlog"/>
        </div>
      </div>
    </div>
    <!--<div>{{ games }}</div>-->
  </div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primevue/api'
import GameTable from "@/components/GameTable.vue";
import CurrentlyPlaying from "@/components/CurrentlyPlaying.vue";
import BacklogTable from "@/components/BacklogTable.vue";

export default {
  name: "GameView",
  components: {
    GameTable,
    CurrentlyPlaying,
    BacklogTable,
  },
  data() {
    return {
      games: null,
      currentlyPlaying: [],
      backlog: [],
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
      this.loading = true;
      this.games = null;
      this.currentlyPlaying = [];
      this.backlog = [];
      const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:K?key='+process.env.VUE_APP_API_KEY
      const { data } = await axios.get(request);
      var input = data.values
      const keys = ["title", "completion", "date", "hours", "genre", "rating", "reccomend", "return", "steamId", "icon", "notes"];
      //console.log(data.values)
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
  place-items: center;
}

</style>