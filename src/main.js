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
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import Chart from 'primevue/chart';

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
import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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
library.add(faSteam);
library.add(faChartSimple);
library.add(faTable);
library.add(faClock);

import { Gradient } from "javascript-color-gradient";
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
app.component('p-dataView', DataView);
app.component('p-dataViewLayoutOptions', DataViewLayoutOptions);
app.component('p-dropdown', Dropdown);
app.component('p-datatable', DataTable);
app.component('p-column', Column);
app.component('p-columnGroup', ColumnGroup);
app.component('p-row', Row);
app.component('p-multiSelect', MultiSelect);
app.component('p-inputText', InputText);
app.component('p-calendar', Calendar);
app.component('p-inputnumber', InputNumber);
app.component('p-tag', Tag);
app.component('p-progressbar', ProgressBar);
app.component('p-slider', Slider);
app.component('p-iconField', IconField);
app.component('p-inputIcon', InputIcon);
app.component('p-carousel', Carousel);
app.component('p-galleria', Galleria);
app.component('p-chart', Chart);
app.use(Gradient);

app.mount("#app");
