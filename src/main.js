import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config';

// Styles
import 'primevue/resources/themes/aura-dark-teal/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

//Components
import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

// Use Components
app.component('p-button', Button);
app.component('p-menu', Menubar);
app.component('p-image', Image);
app.component('p-avatar', Avatar);
app.component('p-card', Card);
app.component('p-divider', Divider);

app.mount("#app");
