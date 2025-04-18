<template>
    <p-dataView :value="gameData" paginator :rows="9" layout="grid" style="width: 900px">
        <template #header>
            Backlog
        </template>
        <template #grid="slotProps">
            <div class="grid grid-nogutter">
                <div v-for="(item, index) in slotProps.items" :key="index" class="">
                    <div class="p-4 border-1 surface-border surface-card flex flex-column">
                        <div class="flex justify-content-center border-round">
                            <div class="relative mx-auto">
                                <a :href="getHLTBPageUrl(item)" target="_blank">
                                    <p-image class="" :src="getBannerUrl(item)" width="250"></p-image>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div v-if="!item.steamId" class="p-4 border-1 surface-border surface-card flex flex-column" style="width:300px;height: 100%">
                        <div class="flex justify-content-center align-content-center border-round w-full h-full">
                            <div class="flex align-items-center justify-content-center w-full h-full">
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                    -->
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
        var banner;
        if(data.steamId != null && data.steamId != ""){
          var id = data.steamId;
          banner = "https://cdn.akamai.steamstatic.com/steam/apps/"+id+"/header.jpg";
        }else{
          var title = data.title.toLowerCase().replace(/ /g,"_").replace(/'/g, '');
          banner = "/game_assets/banners/"+title+"_banner.png";
        }
        return banner;
      },
      getGamePageUrl(data) {
        var gamePage;
        if(data.steamId != null && data.steamId != ""){
          var id = data.steamId;
          var title = data.title.replace(/ /g,"_").replace(/'/g, '');
          gamePage = "https://store.steampowered.com/app/"+id+"/"+title+"/";
        }else{
          var title = data.title.toLowerCase().replace(/ /g,"-").replace(/'/g, '');
          gamePage = "https://store.epicgames.com/en-US/p/"+title;
        }
        return gamePage;
      },
      getHLTBPageUrl(data) {
        var title = data.title.replace(/— /g,"").replace(/- /g,"").replace(/ /g,"%2520").replace(/'/g, '').replace(/:/g, '').replace(/™/g, '').toLowerCase();
        var hLTBPage = "https://howlongtobeat.com/?q="+title;
        return hLTBPage;
      }
    },
  };
  
</script>
    
<style scoped>
</style>