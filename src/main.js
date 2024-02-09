import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config';

// Styles
import 'primevue/resources/themes/aura-dark-teal/theme.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

//Components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Tooltip from 'primevue/tooltip';

// Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLetterboxd } from "@fortawesome/free-brands-svg-icons";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);
library.add(faLetterboxd);
library.add(faSquareFacebook);
library.add(faTwitch);
library.add(faYoutube);
library.add(faGithub);
library.add(faLinkedin);
library.add(faGamepad);
library.add(faHouse);
library.add(faEnvelope);

const app = createApp(App);
app.use(PrimeVue);
app.use(router);

// Use Components
app.component("font-awesome-icon", FontAwesomeIcon)
app.component('p-button', Button);
app.component('p-menu', Menubar);
app.component('p-image', Image);
app.component('p-avatar', Avatar);
app.component('p-card', Card);
app.component('p-divider', Divider);
app.directive('tooltip', Tooltip);

app.mount("#app");
