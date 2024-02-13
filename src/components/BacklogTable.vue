<template>
    <p-dataView :value="gameData" paginator :rows="9" layout="grid" style="width: 900px">
        <template #header>
            Backlog
        </template>
        <template #grid="slotProps">
            <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="">
                    <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                        <div class="flex justify-content-center border-round">
                            <div class="relative mx-auto" v-if="item.steamId">
                                <a href="https://github.com/C-Dahr" target="_blank">
                                    <p-image class="" :src="getBannerUrl(item)" width="250"></p-image>
                                </a>
                                <Tag value="test" severity="success" class="absolute" style="left: 4px; top: 4px"></Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </p-dataView>
</template>
    
<script>
  export default {
    name: "BacklogTable",
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