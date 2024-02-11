<template>
    <p-datatable v-model:filters="filters" :value="gameData" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" dataKey="title"
            filterDisplay="menu" :loading="loading" removableSort :globalFilterFields="['title']" v-model:expandedRows="expandedRows" @rowExpand="onRowExpand" tableStyle="width: 50rem;height: 50rem">
    <template #header>
        <div class="flex justify-content-between">
        <!--
            TODO: Move this Clear button to the right and add a refresh table button here that re-queries google sheets
        -->
        <p-button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
        <p-iconField iconPosition="left">
            <p-inputIcon>
            <i class="pi pi-search" />
            </p-inputIcon>
            <p-inputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </p-iconField>
        </div>
    </template>
    <template #empty>
        <p class="flex flex-column align-items-center justify-content-center">
        No games found.
        </p>
    </template>
    <template #loading> Loading customers data. Please wait. </template>
    <p-column expander style="width: 5rem" />
    <p-column field="title" header="Title" sortable style="min-width: 18rem">
        <template #body="{ data }">
        <div class="flex flex-row align-items-center">
            <div v-if="data.icon" class="mr-3">
            <p-image :src="getIconUrl(data)"></p-image>
            </div>
            <div>
            {{ data.title }}
            </div>
        </div>
        </template>
    </p-column>
    <p-column field="completion" header="Completion" filterField="completion" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" sortable style="min-width: 14rem">
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
    <p-column field="hours" header="Time Played (hrs)" sortable style="min-width: 12rem">
        <template #body="{ data }">
        {{ data.hours }}
        </template>
    </p-column>
    <p-column header="Date" filterField="date" dataType="date" style="min-width: 10rem">
        <template #body="{ data }">
        {{ data.date }}
        </template>
    </p-column>
    <p-column field="genre" header="Genres" sortable style="min-width: 12rem">
        <template #body="{ data }">
        <div v-if=data.genre>
            <p-tag v-for="item in formatTags(data.genre)" :value=item severity="secondary" v-bind:key="item" class="m-1"/>
        </div>
        </template>
    </p-column>
    <p-column field="rating" header="Rating" filterField="rating" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" sortable style="min-width: 14rem">
        <template #body="{ data }">
        <div v-if=data.rating>
            <p-tag :value="data.rating" :severity="getRatingSeverity(data.rating)" />
        </div>
        </template>
        <template #filter="{ filterModel }">
        <p-multiSelect v-model="filterModel.value" :options="ratings" placeholder="Any" class="p-column-filter">
            <template #option="slotProps">
            <div class="flex align-items-center gap-2">
                <p-tag :value="slotProps.option" :severity="getRatingSeverity(slotProps.option)" />
            </div>
            </template>
        </p-multiSelect>
        </template>
    </p-column>
    <template #expansion="slotProps">
        <div class="p-3">
        <div v-if="slotProps.data.steamId">
            <p-image :src="getBannerUrl(slotProps.data)"></p-image>
        </div>
        </div>
    </template>
    </p-datatable>
  </template>
  
  <script>
  // TODO: "Currently Playing" carousel that shows what I'm currently playing with pictures and stuff
  // https://primevue.org/carousel/
  // You can create the path to steam header pictures if you know the steam app id
  
  // TODO: Maybe remove backlog from main table and create a second table that's just the backlog
  
  import { FilterMatchMode, FilterOperator } from 'primevue/api'
  
  export default {
    name: "GameView",
    props: ['gameData', 'loading'],
    data() {
      return {
        customers: null,
        filters: null,
        statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
        ratings: ['Bad', 'Ok', 'Good', 'Great', 'Love'],
        expandedRows: []
      };
    },
    created() {
      this.initFilters();
    },
    mounted() {
    },
    methods: {
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
  };
  </script>
  
  <style scoped>
  
  .games {
    display: grid;
    height: -webkit-fill-available;
    width: 100%;
  }
  
  </style>