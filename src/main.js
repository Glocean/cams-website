import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config';

// Styles
import 'primevue/resources/themes/aura-dark-teal/theme.css'

//Components
import Button from "primevue/button"

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

// Use Components
app.component('p-button', Button);

app.mount("#app");
