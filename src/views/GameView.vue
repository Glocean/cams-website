<template>
  <div class="games">
    <video autoplay muted loop id="myVideo" class="fadein animation-duration-500">
      <source :src="require('@/assets/Underwater_Garden.mp4')" type="video/mp4">
    </video>
    <div id="overlay"/>
    <div class="content flex flex-column align-items-center justify-content-center fadein animation-ease-in animation-duration-1000">
        <p-dataView :value="games" paginator :rows="5" :sortOrder="sortOrder" :sortField="sortField" class="m-5">
            <template #header>
                <p-dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
            </template>
            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="md:w-10rem relative">
                                <img class="block xl:block mx-auto border-round w-full" :src="require('@/assets/headshot.png')" :alt="item.name" />
                                <Tag :value="item.inventoryStatus" severity="success" class="absolute" style="left: 4px; top: 4px"></Tag>
                            </div>
                            <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                    <div>
                                        <div class="text-lg font-medium text-900 mt-2">{{ item.title }}</div>
                                    </div>
                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-column md:align-items-end gap-5">
                                    <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button icon="pi pi-heart" outlined></Button>
                                        <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </p-dataView>
      <div>{{ games }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameView",
  data() {
    return {
      games: null,
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: 'Title A to Z', value: 'title' },
        { label: 'Title Z to A', value: '!title' }
      ]
    };
  },
  methods: {
    async getGames() {
      const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:H?key='+process.env.VUE_APP_API_KEY
      console.log(request)
      const { data } = await axios.get(request);
      console.log(data)
      var input = data.values
      const keys = ["title", "completion", "finished", "hours", "genre", "rating", "reccomend", "return"];
      this.games = input.reduce(function(acc, cur, i) {
        var test = cur.reduce(function(acc, cur, i) {
          acc[keys[i]] = cur;
          return acc;
        }, {});
        acc[i] = test;
        return acc;
      }, []);
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;
      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
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