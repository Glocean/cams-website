<template>
    <div class="games">
        <div class="flex flex-column w-full justify-content-center align-items-center">
            <div class="flex flex-row justify-content-center align-items-center mt-8 flex-wrap">
                <div class="flex flex-column justify-content-center align-items-center pt-8 pr-8">
                        <p-chart type="pie" :data="setCompletionChartData()" :options="setCompletionChartOptions()" class="w-full md:w-30rem" />
                        <p-chart type="pie" :data="setRatingChartData()" :options="setRatingChartOptions()" class="w-full md:w-30rem" />
                </div>
                <div class="flex flex-column justify-content-center align-items-center mt-8 pr-8">
                    <p-card class="shadow-8" style="background:rgba(0, 0, 0, 0.4);">
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
                    <p-card class="shadow-8 mt-5" style="background:rgba(0, 0, 0, 0.4);">
                        <template #header>
                            <p-image :src="getBannerUrl(topPlayedGame)"></p-image>
                        </template>
                        <template #title>
                            <span class="flex text-4xl">
                                Top Played 
                            </span>
                        </template>
                        <template #content>
                            <div class="flex flex-row justify-content-start align-items-center">
                                <div class="flex flex-row justify-content-center align-items-center">
                                    <div class="flex flex-column justify-content-center align-items-center mr-3">
                                        <div v-if="topPlayedGame.icon" class="mr-0">
                                            <p-image :src="getIconUrl(topPlayedGame)"></p-image>
                                        </div>
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
                                        <div v-if="item.icon" class="mr-0">
                                            <p-image :src="getIconUrl(item)"></p-image>
                                        </div>
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
                <div class="flex flex-column justify-content-center align-items-center mt-8 pr-8">
                    <p-card class="shadow-8 w-30rem mb-5" style="background:rgba(0, 0, 0, 0.4);">
                        <template #content>
                            <div class="flex flex-row align-items-center justify-content-between">
                                <span class="flex text-4xl">
                                    <b>Top Genres</b>
                                </span>
                            </div>
                            <div v-for="item, index in topFiveGenres" v-bind:key="item[0]" class="flex flex-row justify-content-start align-items-center mt-3" >
                                <div class="flex flex-row justify-content-between align-items-center w-full">
                                    <div class="flex flex-row justify-content-start align-items-center">
                                        <div class="flex flex-column justify-content-center align-items-center mr-3">
                                            <span class="flex text-4xl">
                                            </span>
                                        </div>
                                        <div class="flex flex-column justify-content-center">
                                            <div class="flex flex-row">
                                                <span class="flex text-2xl">
                                                    {{ item[0] }}
                                                </span>
                                            </div>
                                            <div class="flex flex-row mt-1">
                                                <span class="flex text-md">
                                                    Total Games: {{ genres[item[0]] }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-column justify-content-center align-items-center mr-3">
                                        <span class="flex text-4xl">
                                            <i>{{ item[1] }}/10</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </p-card>
                    <p-card class="shadow-8 w-30rem" style="background:rgba(0, 0, 0, 0.4);">
                        <template #content>
                            <div class="flex flex-row align-items-center justify-content-between">
                                <span class="flex text-4xl mb-3">
                                    Genre Ratings
                                </span>
                                <p-dropdown class="filter-popup" v-model="currentGenre" :options="['All'].concat(genreLabels)" optionLabel:="genre" filter/>
                            </div>
                            <div class="flex flex-row align-items-center">
                                <span class="flex text-2xl mb-3 mr-3">
                                    Average Rating: {{ genreAvgRatings[currentGenre] }}
                                </span>
                            </div>
                            <p-chart type="bar" :data="setGenreRatingsChartData()" :options="setGenreRatingsOptions()" class="w-full md:w-40rem" />
                        </template>
                    </p-card>
                </div>
            </div>
            <div class="flex flex-row w-11 mt-8 mb-5">
                <div class="flex flex-column w-full md:w-40rem">
                    <p-card class="shadow-8" style="background:rgba(0, 0, 0, 0.4);">
                        <template #content>
                            <span class="flex text-4xl mb-3">
                                Most Played Genres
                            </span>
                            <p-chart type="bar" :data="setGenreChartData()" :options="setGenreOptions()" class="w-full md:w-40rem" />
                        </template>
                    </p-card>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
//TODO:
// Favorite games widget (or maybe 'recent hits' or something)
// Completed this year table? Maybe better on other page
import axios from "axios";
import Gradient from "javascript-color-gradient";
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
            genreLabels: [],
            genreCounts: [],
            grenres: {},
            genreRatings: {},
            genreAvgRatings: {},
            topFiveGenres: [],
            currentGenre: null,
            backlog: [],
            customers: null,
            loading: true,
            totalPlaytime: 0,
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
            this.genres = {};
            this.genreAvgRatings = {};
            this.genreAvgRatings["All"] = 0;
            this.genreRatings = {};
            this.currentGenre = "All";
            this.genreRatings["All"] = [0,0,0,0,0,0,0,0,0,0];
            this.topFiveGenres = [];
            this.loading = true;
            this.games = null;
            var totalGamesWithGenre = 0;
            this.totalPlaytime = 0;
            this.topTenPlaytime = [];
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
            this.loading = false;
            var genreArr = [];
            this.games.forEach((item) => {

                // Playtime
                if(item.hours){
                    this.totalPlaytime = this.totalPlaytime + Number(item.hours);
                    if(this.topTenPlaytime.length < 5){
                        this.topTenPlaytime.push(item)
                    }else{
                        this.comparePlaytime(item);
                    }
                }

                // Tags
                if(item.genre){
                    this.genreRatings["All"][Number(item.rating)-1]++;
                    this.genreAvgRatings["All"] += Number(item.rating);
                    totalGamesWithGenre++;
                    genreArr = this.formatTags(item.genre);
                    genreArr.forEach((tag) => {
                        if(tag in this.genres){
                            this.genres[tag]++;
                            this.genreRatings[tag][Number(item.rating)-1]++;
                            this.genreAvgRatings[tag] += Number(item.rating);
                        }else{
                            this.genres[tag] = 1;
                            this.genreRatings[tag] = [0,0,0,0,0,0,0,0,0,0];
                            this.genreRatings[tag][Number(item.rating)-1]++;
                            this.genreAvgRatings[tag] = Number(item.rating);
                        }
                    })
                }
            });
            
            var allGenreTotal = this.genreAvgRatings["All"];
            for (const genreVar in this.genreAvgRatings) {
                this.genreAvgRatings[genreVar] = Math.round((this.genreAvgRatings[genreVar]/this.genres[genreVar]) * 100)/100;
            }
            this.genreAvgRatings["All"] = Math.round((allGenreTotal/totalGamesWithGenre) * 100)/100;
            const sortedScores = Object.entries(this.genreAvgRatings).sort(([,a],[,b]) => Number(b) - Number(a));
            var numSelected = 0;
            var scoreIndex = 0;
            while (numSelected < 5) {
                if (this.genres[sortedScores[scoreIndex][0]] >= 3){
                    this.topFiveGenres[numSelected] = sortedScores[scoreIndex];
                    numSelected++;
                }
                scoreIndex++;
            }
            //this.topFiveGenres = sortedScores.slice(0, 5);
            
            this.totalPlaytime = Math.round(this.totalPlaytime * 10) / 10
            this.topPlayedGame = this.topTenPlaytime[4];
            
            this.topTenPlaytime.splice(4, 1);
            this.topTenPlaytime.sort((a,b) => Number(b.hours) - Number(a.hours));
            
            var sortable = Object.entries(this.genres)
                .sort(([,a],[,b]) => b-a)
                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            this.genres = sortable;
            this.genreLabels = Object.keys(this.genres);
            this.genreCounts = Object.values(this.genres);
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
            const request = "https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/'Aggregation'!H6:I10?key="+import.meta.env.VITE_API_KEY
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
            const request = "https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/'Aggregation'!H27:I31?key="+import.meta.env.VITE_API_KEY
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
            return {
                labels: this.completionLabels,
                datasets: [
                    {
                        data: this.completionCounts,
                        backgroundColor: ['#06b6d4', '#22c55e', '#eab308', '#ff3d32', '#a855f7'],
                        hoverBackgroundColor: ['#44B8CD', '#43C171', '#E9C24D', '#FE726B', '#C180FE'],
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
                        text: 'Completion',
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
                            padding: 20,
                            color: 'white',
                            font: {
                                family: "Helvetica",
                                size: 15,
                                weight: "normal",
                            },
                        },
                        display: true,
                        position: "right",
                    }
                },
                layout: {
                    padding: {
                        bottom: 10,
                        left: 10,
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
                        backgroundColor: ['#06b6d4', '#22c55e', '#eab308', '#f97316', '#ff3d32'],
                        hoverBackgroundColor: ['#44B8CD', '#43C171', '#E9C24D', '#FF9A52', '#FE726B'],
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
                            padding: 20,
                            color: 'white',
                            font: {
                                family: "Helvetica",
                                size: 15,
                                weight: "normal",
                            },
                        },
                        display: true,
                        position: "right",
                    },
                },
                layout: {
                    padding: {
                        bottom: 10,
                        left: 10,
                    }
                },
            };
        },
        setGenreChartData() {
            //const documentStyle = getComputedStyle(document.body);
            var gradientArray = new Gradient()
                .setColorGradient("#36f736", "#f72828")
                .setMidpoint(30)
                .getColors();
            return {
                labels: this.genreLabels.slice(0,30),
                datasets: [
                    {
                        label: "Genres",
                        backgroundColor: gradientArray,
                        data: this.genreCounts.slice(0,30),
                        borderWidth: 1,
                    }
                ],
            };
        },
        setGenreOptions () {
            //const documentStyle = getComputedStyle(document.documentElement);
            //const textColor = documentStyle.getPropertyValue('--text-color');
            //const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            //const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: "white"
                        }
                    },
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false,
                            drawBorder: false,
                            zeroLineColor: "white",
                        },
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: "white",
                            font: {
                                size: 18,
                                family: "Helvetica",
                            },
                        },
                    }
                }
            }
        }, 
        setGenreRatingsChartData() {
            //const documentStyle = getComputedStyle(document.body);
            var gradientArray = new Gradient()
                .setColorGradient("#f72828", "#36f736")
                .setMidpoint(10)
                .getColors();
            return {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [
                    {
                        label: "Ratings",
                        backgroundColor: gradientArray,
                        data: this.genreRatings[this.currentGenre],
                        borderWidth: 1,
                    }
                ],
            };
        },
        setGenreRatingsOptions () {
            //const documentStyle = getComputedStyle(document.documentElement);
            //const textColor = documentStyle.getPropertyValue('--text-color');
            //const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            //const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: "white"
                        }
                    },
                },
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
        formatTags(value) {
            return value.split(", ");
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

.body {
    font-family: Avenir, Helvetica, Arial, sans-serif !important;
}
  
</style>