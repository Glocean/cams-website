<template>
  <p-carousel :value="gameData" :numVisible="1" :numScroll="1" circular :autoplayInterval="3000" :showNavigators="false" :showIndicators="false" containerClass="w-full" style="width: 460px">
    <template #item="slotProps">
      <div v-if="slotProps.data.steamId">
        <p-image :src="getBannerUrl(slotProps.data)" style="width: 100%;"></p-image>
      </div>
    </template>
    <template #footer>
      <p-card style="background:rgba(0, 0, 0, 0.60);position: relative; top: -52px;border-radius: 0px;height: 3rem">
      </p-card>
      <p style="position: relative; top: -116px;font-size:x-large;">
        Currently Playing
      </p>
    </template>
  </p-carousel>
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
</style>