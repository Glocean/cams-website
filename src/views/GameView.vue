<template>
  <div class="games">
    <video autoplay muted loop id="myVideo" class="fadein animation-duration-500">
      <source :src="require('@/assets/Underwater_Garden.mp4')" type="video/mp4">
    </video>
    <div id="overlay"/>
    <div class="content flex flex-column align-items-center justify-content-center fadein animation-ease-in animation-duration-1000">
      <p-datatable v-model:filters="filters" :value="games" paginator showGridlines :rows="10" dataKey="id"
                filterDisplay="menu" :loading="loading" removableSort :globalFilterFields="['title', 'completion', 'date', 'hours', 'rating']">
        <template #header>
          <div class="flex justify-content-between">
            <p-button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
            <p-iconField iconPosition="left">
              <p-inputIcon>
                <i class="pi pi-search" />
              </p-inputIcon>
              <p-inputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </p-iconField>
          </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <p-column field="title" header="Title" sortable style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.title }}
          </template>
        </p-column>
        <p-column header="Completion" filterField="completion" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
          <template #body="{ data }">
            <p-tag :value="data.completion" :severity="getSeverity(data.completion)" />
          </template>
          <template #filter="{ filterModel }">
            <p-multiSelect v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter">
              <template #option="slotProps">
                <div class="flex align-items-center gap-2">
                  <p-tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                </div>
              </template>
            </p-multiSelect>
          </template>
        </p-column>
      </p-datatable>
      <div>{{ games }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primevue/api'

export default {
  name: "GameView",
  data() {
    return {
      games: null,
      customers: null,
      filters: null,
      statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
      loading: true
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
  },
  methods: {
    async getGames() {
      const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:H?key='+process.env.VUE_APP_API_KEY
      console.log(request)
      const { data } = await axios.get(request);
      var input = data.values
      const keys = ["title", "completion", "date", "hours", "genre", "rating", "reccomend", "return"];
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
    formatDate(value) {
       return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
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
        completion: { value: null, matchMode: FilterMatchMode.IN },
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
    }
  },
  beforeMount() {
    this.getGames();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

#overlay {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.home {
  display: grid;
  height: -webkit-fill-available;
  width: 100%;
}

.content {
  height: -webkit-fill-available;
  display: grid;
  place-items: center;
  font-family: Garamond !important;
  font-size: 6vh;
}

#title {
  font-size: 8vh;
}

#card-text {
  font-size: 2vh;
}

.p-divider.p-divider-horizontal:before {
    border-top: 1px #ffffff;
    border-top-style: solid;
}

</style>