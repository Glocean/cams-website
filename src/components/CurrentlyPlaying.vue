<template>
  <p-card style="background:rgba(0, 0, 0, 0.5);">
    <template #content>
      <p-carousel :value="gameData" :numVisible="1" :numScroll="1" circular :autoplayInterval="3000" :showNavigators="false" :showIndicators="false" containerClass="w-full">
        <template #item="slotProps">
          <div v-if="slotProps.data.steamId">
            <p-image :src="getBannerUrl(slotProps.data)" style="width: 100%;"></p-image>
          </div>
        </template>
        <template #footer>
          <div>
            Currently Playing
          </div>
        </template>
      </p-carousel>
    </template>
  </p-card>
</template>
  
<script>

export default {
  name: "GameView",
  props: ['gameData'],
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {

  },
  methods: {
    getBannerUrl(data) {
      var id = data.steamId;
      var banner = "https://cdn.akamai.steamstatic.com/steam/apps/"+id+"/header.jpg";
      return banner;
    }
  },
};

</script>
  
<style scoped>

.p-carousel-items-container{
  max-width: 50%;
}
</style>