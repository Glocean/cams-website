<template>
    <div class="games">
        <div class="flex flex-row w-full h-full">
            <div class="flex flex-column justify-content-center align-items-center w-full h-full">
                <div class="flex flex-row">
                    <p-chart type="pie" :data="setCompletionChartData()" :options="setCompletionChartOptions()" class="w-full md:w-30rem" />
                </div>
                <div class="flex flex-row mt-8">
                    <p-chart type="pie" :data="setRatingChartData()" :options="setRatingChartOptions()" class="w-full md:w-30rem" />
                </div>
            </div>
            <div class="flex flex-column justify-content-center align-items-center w-full h-full">
                <div class="flex flex-row">
                    <p-card class="shadow-8" style="background:rgba(0, 0, 0, 0);">
                        <template #content>
                            <div class="flex flex-row justify-content-center align-items-center">
                                <div class="flex flex-column justify-content-center align-items-center mr-3">
                                    <font-awesome-icon class="text-8xl" icon="fa-solid fa-clock" color="white" />
                                </div>
                                <div class="flex flex-column justify-content-center">
                                    <div class="flex flex-row">
                                        <span class="flex text-4xl">
                                            {{ totalPlaytime }} Hours
                                        </span>
                                    </div>
                                    <div class="flex flex-row mt-1">
                                        <span>
                                            Total Playtime
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </p-card>
                </div>
                <div class="flex flex-row mt-5">
                    <p-card class="shadow-8" style="background:rgba(0, 0, 0, 0.5);">
                        <template #header>
                            <p-image :src="getBannerUrl(topPlayedGame)"></p-image>
                        </template>
                        <template #content>
                            <div class="flex flex-row justify-content-start align-items-center">
                                <div class="flex flex-row justify-content-center align-items-center">
                                    <div class="flex flex-column justify-content-center align-items-center mr-3">
                                        <span class="flex text-4xl">
                                            #1. 
                                        </span>
                                    </div>
                                    <div class="flex flex-column justify-content-center">
                                        <div class="flex flex-row">
                                            <span class="flex text-2xl">
                                                {{ topPlayedGame.title }}
                                            </span>
                                        </div>
                                        <div class="flex flex-row mt-1">
                                            <span class="flex text-lg">
                                                {{ topPlayedGame.hours }} hours
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-for="item, index in topTenPlaytime" v-bind:key="item.title" class="flex flex-row justify-content-start align-items-center mt-3" >
                                <div class="flex flex-row justify-content-center align-items-center">
                                    <div class="flex flex-column justify-content-center align-items-center mr-3">
                                        <span class="flex text-4xl">
                                            #{{ index+2 }}. 
                                        </span>
                                    </div>
                                    <div class="flex flex-column justify-content-center">
                                        <div class="flex flex-row">
                                            <span class="flex text-2xl">
                                                {{ item.title }}
                                            </span>
                                        </div>
                                        <div class="flex flex-row mt-1">
                                            <span class="flex text-lg">
                                                {{ item.hours }} hours
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </p-card>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
//TODO:
// Total playtime widget
// Most playtime widget (maybe carousel of top 5 or 10?)
// Most popular genre widget (maybe genre breakdown? Bar chart?)
// 
import axios from "axios";
export default {
    name: "GameStatsView",
    components: {
    },
    data() {
        return {
            completionLabels: [],
            completionCounts: [],
            completion: {},
            ratingLabels: [],
            ratingCounts: [],
            rating: {},
            backlog: [],
            customers: null,
            loading: true,
            totalPlaytime: 0,
            playtimes: [],
            games: null,
            topTenPlaytime: [],
            topPlayedGame: [],
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
            this.totalPlaytime = 0;
            this.playtimes = [];
            this.topTenPlaytime = [];
            const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:K?key='+process.env.VUE_APP_API_KEY
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
            this.loading = false;
            this.games.forEach((item, index) => {
                this.playtimes[index] = Number(item.hours);
                if(item.hours){
                    this.totalPlaytime = this.totalPlaytime + Number(item.hours);
                    if(this.topTenPlaytime.length < 10){
                        this.topTenPlaytime.push(item)
                    }else{
                        this.comparePlaytime(item);
                    }
                }
            });
            this.totalPlaytime = Math.round(this.totalPlaytime * 10) / 10
            this.topPlayedGame = this.topTenPlaytime[9];
            this.topTenPlaytime.splice(9, 1);
        },
        comparePlaytime(game){
            this.topTenPlaytime.sort((a,b) => Number(a.hours) - Number(b.hours));
            for (let i = 0; i < this.topTenPlaytime.length; i++) {
                if(Number(game.hours) > Number(this.topTenPlaytime[i].hours)){
                    this.topTenPlaytime[i] = game;
                    break;
                }
            }
        },
        async getCompletionData() {
            this.loading = true;
            this.completion = {};
            this.completionLabels = [];
            this.completionCounts = [];
            const request = "https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/'Aggregation'!H6:I10?key="+process.env.VUE_APP_API_KEY
            const { data } = await axios.get(request);
            var input = data.values
            for (let i = 0; i < input.length; i++) {
                var label = input[i][0];
                var val = Number(input[i][1]);
                this.completionLabels[i] = label;
                this.completionCounts[i] = val;
                this.completionCounts[label] = val;
            }
            this.loading = false;
        },
        async getRatingData() {
            this.loading = true;
            this.rating = {};
            this.ratingLabels = [];
            this.ratingCounts = [];
            const request = "https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/'Aggregation'!H27:I31?key="+process.env.VUE_APP_API_KEY
            const { data } = await axios.get(request);
            var input = data.values
            for (let i = 0; i < input.length; i++) {
                var label = input[i][0];
                var val = Number(input[i][1]);
                this.ratingLabels[i] = label;
                this.ratingCounts[i] = val;
                this.ratingCounts[label] = val;
            }
            this.loading = false;
        },
        setCompletionChartData() {
            const documentStyle = getComputedStyle(document.body);
            return {
                labels: this.completionLabels,
                datasets: [
                    {
                        data: this.completionCounts,
                        backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--purple-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--purple-400')],
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 5,
                        borderAlign: 'inner',
                        hoverOffset: 30,
                        clip: 50,  
                    }
                ]
            };
        },
        setCompletionChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            return {
                plugins: {
                    title: {
                        display: true,
                        text: 'Game Ratings',
                        color: 'white',
                        font: {
                            family: "Helvetica",
                            size: 30,
                            weight: "normal",
                        },
                    },
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor,
                            padding: 20,
                        },
                        display: true,
                        position: "bottom",
                    }
                },
                layout: {
                    padding: {
                        bottom: 10
                    }
                },
            };
        },
        setRatingChartData() {
            const documentStyle = getComputedStyle(document.body);
            return {
                labels: this.ratingLabels,
                datasets: [
                    {
                        data: this.ratingCounts,
                        backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--red-400')],
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 5,
                        borderAlign: 'inner',
                        hoverOffset: 30,
                        clip: 50,  
                    }
                ]
            };
        },
        setRatingChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            return {
                plugins: {
                    title: {
                        display: true,
                        text: 'Game Ratings',
                        color: 'white',
                        font: {
                            family: "Helvetica",
                            size: 30,
                            weight: "normal",
                        },
                    },
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor,
                            padding: 20,
                        },
                        display: true,
                        position: "bottom",
                    },
                },
                layout: {
                    padding: {
                        bottom: 10
                    }
                },
            };
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
    },
    beforeMount() {
        this.getCompletionData();
        this.getRatingData();
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