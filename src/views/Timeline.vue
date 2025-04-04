<template>
  <div class="timeline py-5">
    <div class="flex flex-column w-full justify-content-center align-items-center">
      <div class="flex flex-row align-items-center mt-8">
        <span class="text-8xl"> {{ currentYear }}</span>
      </div>
      <div class="flex flex-row justify-content-center align-items-center" style="width: 30%;">
        <p-divider class="my-divider w-10 py-5"/>
      </div>
    </div>
    <div :key="componentKey">
      <div v-if="!loading" v-for="month in months" class="game-timeline fadein animation-ease-in animation-duration-1000">
        <div v-if="gamesByDate[currentYear][month].length > 1" class="flex flex-column w-full justify-content-center align-items-center">
          <div class="flex flex-row align-items-center">
            <span class="flex text-7xl mb-3 mt-2">{{ month }}</span>
          </div>
        </div>
        <p-timeline :value="gamesByDate[currentYear][month]" align="alternate" class="customized-timeline">
          <template #marker="slotProps">
            <div class="flex flex-row justify-content-center align-items-center absolute" style="height: 100%;">
              <font-awesome-icon v-if=slotProps.item.title class="text-xl" icon="fa-solid fa-circle-dot"/>
            </div>
          </template>
          <template #connector="slotProps">
          </template>
          <template #opposite="slotProps">
            <div v-if=slotProps.item.title style="height: 100%;display: grid; align-items: center;">
              <p-card style="background:rgba(0, 0, 0, 0); box-shadow: none;">
                <template #title>
                  {{ slotProps.item.title }}
                </template>
                <template #subtitle>
                  {{ slotProps.item.date }}
                </template>
              </p-card>
            </div>
          </template>
          <template #content="slotProps">
            <p-card v-if=slotProps.item.title style="background:rgba(0, 0, 0, 0); box-shadow: none;">
              <template #content>
                <img v-if="slotProps.item.steamId" :src="getBannerUrl(slotProps.item)" :alt="slotProps.item.title" width="600" class="shadow-sm" />
              </template>
            </p-card>
          </template>
        </p-timeline>
      </div>
    </div>
  </div>
  <p-speedDial class="p-5" :model="yearOptions" direction="up" :style="{ position: 'fixed', left: 0, bottom: 0 }" :buttonProps="{ severity: 'primary', rounded: true }" :tooltipOptions="{ position: 'right' }">
      <template #item="{ item, toggleCallback }">
        <div class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer" @click="toggleCallback">
          <span>{{ item.label }}</span>
        </div>
      </template>
    </p-speedDial>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Timeline",
    components: {
    },
    data() {
      return {
        componentKey: 0,
        games: null,
        currentlyPlaying: [],
        backlog: [],
        filters: null,
        statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
        ratings: ['Bad', 'Ok', 'Good', 'Great', 'Love'],
        loading: true,
        expandedRows: [],
        gamesByDate: {
          '2025': {
            'January': [],
            'February': [],
            'March': [],
            'April': [],
            'May': [],
            'June': [],
            'July': [],
            'August': [],
            'September': [],
            'October': [],
            'November': [],
            'December': [],
          },
          '2024': {
            'January': [],
            'February': [],
            'March': [],
            'April': [],
            'May': [],
            'June': [],
            'July': [],
            'August': [],
            'September': [],
            'October': [],
            'November': [],
            'December': [],
          },
        },
        years: [
          '2024',
          '2025'
        ],
        yearOptions: [
          {
            label: '2024',
            command: () => {
              this.currentYear = '2024';
              window.scrollTo(0, 0);
              this.forceRenderer();
            }
          },
          {
            label: '2025',
            command: () => {
              this.currentYear = '2025';
              window.scrollTo(0, 0);
              this.forceRenderer();
            }
          }
        ],
        currentYear: '2024',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
        this.games.forEach((item) => {
          if(item.date){
            this.years.forEach((year) => {
              if(item.date.includes(year)){                      
                if(item.date.includes('-01-')){
                  this.gamesByDate[year]['January'].push(item);
                }else if(item.date.includes('-02-')){
                  this.gamesByDate[year]['February'].push(item);
                }else if(item.date.includes('-03-')){
                  this.gamesByDate[year]['March'].push(item);
                }else if(item.date.includes('-04-')){
                  this.gamesByDate[year]['April'].push(item);
                }else if(item.date.includes('-05-')){
                  this.gamesByDate[year]['May'].push(item);
                }else if(item.date.includes('-06-')){
                  this.gamesByDate[year]['June'].push(item);
                }else if(item.date.includes('-07-')){
                  this.gamesByDate[year]['July'].push(item);
                }else if(item.date.includes('-08-')){
                  this.gamesByDate[year]['August'].push(item);
                }else if(item.date.includes('-09-')){
                  this.gamesByDate[year]['September'].push(item);
                }else if(item.date.includes('-10-')){
                  this.gamesByDate[year]['October'].push(item);
                }else if(item.date.includes('-11-')){
                  this.gamesByDate[year]['November'].push(item);
                }else if(item.date.includes('-12-')){
                  this.gamesByDate[year]['December'].push(item);
                }
              }
            })
          }
          if (item.completion == "In Progress") {
            this.currentlyPlaying.push(item)
          }else if (item.completion == "Backlog") {
            this.backlog.push(item)
          }
        });
        var swap = false;
        var tmpCount = 0;
        var totalCount = 0;
        this.years.forEach((year) => {
          this.months.forEach((month) => {
            tmpCount = this.gamesByDate[year][month].length;
            if(tmpCount == 0){
              return
            }
            totalCount = tmpCount + totalCount;
            this.gamesByDate[year][month] = this.gamesByDate[year][month].sort( this.compareDates );
            this.gamesByDate[year][month].push({});
            if(swap){
              this.gamesByDate[year][month].unshift({});
            }
            swap = false;
            if(totalCount % 2 == 1){
              swap = true;
            }
          })
        })
        this.loading = false;
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
      },
      compareDates( a, b ) {
        const firstDate = new Date(a.date);
        const secondDate = new Date(b.date)
        if ( firstDate < secondDate ){
          return -1;
        }
        if ( firstDate > secondDate ){
          return 1;
        }
        return 0;
      },
      forceRenderer() {
        this.componentKey += 1;
      }
    },
    beforeMount() {
      this.getGames();
    },
  };
  </script>
  
  <style scoped>

  .p-divider.p-divider-horizontal:before {
      border-top: 1px #ffffff;
      border-top-style: solid;
  }

  </style>