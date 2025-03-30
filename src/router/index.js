import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import GameStatsView from "../views/GameStatsView.vue";
import Timeline from "../views/Timeline.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/games",
    name: "games",
    component: GameView,
  },
  {
    path: "/games/stats",
    name: "gamesStats",
    component: GameStatsView,
  },
  {
    path: "/games/timeline",
    name: "timeline",
    component: Timeline,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
