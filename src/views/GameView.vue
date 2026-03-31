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
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import GameTable from "@/components/GameTable.vue";
import CurrentlyPlaying from "@/components/CurrentlyPlaying.vue";
import BacklogTable from "@/components/BacklogTable.vue";
import { getBannerUrl, getGamePageUrl, getIconUrl, getGames } from "@/scripts/utils";

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
      this.games = await getGames();
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
    getIconUrl,
    getBannerUrl
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