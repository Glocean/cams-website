<template>
    <div class="games">
        <div class="flex align-items-center justify-content-around flex-wrap">
            <div class="flex justify-content-center m-8">
                <p-chart type="pie" :data="setChartData()" :options="setChartOptions()" class="w-full md:w-30rem" />
            </div>
            <div class="flex justify-content-center flex-column m-8 h-full flex-wrap">
                <div class="flex align-items-center justify-content-center">

                </div>
                <div class="flex align-items-center justify-content-center">

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
//TODO: Probably a good idea to move each of these charts out to their own components
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
            backlog: [],
            customers: null,
            statuses: ['Backlog', 'Finished', '100%', 'Abandoned', 'In Progress'],
            ratings: ['Bad', 'Ok', 'Good', 'Great', 'Love'],
            loading: true,
        };
    },
    created() {
    },
    mounted() {
    },
    methods: {
        async getData() {
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
            console.log(this.completionCounts)
            this.loading = false;
        },
        formatTags(value) {
            return value.split(",");
        },
        getRating(status) {
            switch (status) {
                case 'Abandoned':
                    return 'danger';
                case 'Finished':
                    return 'success';
                case 'Backlog':
                    return 'info';
                case 'In Progress':
                    return 'warning';
                case '100%':
                    return 'warning';
            }
        },
        setChartData() {
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
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            return {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                },
                layout: {
                    padding: {
                        bottom: 5
                    }
                },
            };
        }
    },
    beforeMount() {
        this.getData();
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