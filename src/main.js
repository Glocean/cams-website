import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config';

// Styles
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Nora from '@primeuix/themes/aura';

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
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Tag from 'primevue/tag';
import ProgressBar from 'primevue/progressbar';
import Slider from 'primevue/slider';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';
import Timeline from 'primevue/timeline';
import AnimateOnScroll from 'primevue/animateonscroll';
import SpeedDial from 'primevue/speeddial';



// Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLetterboxd } from "@fortawesome/free-brands-svg-icons";
import { faSquareLetterboxd } from "@fortawesome/free-brands-svg-icons";
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
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faTimeline } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";


library.add(faPhone);
library.add(faLetterboxd);
library.add(faSquareLetterboxd);
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
library.add(faStar);
library.add(faStarHalfStroke);
library.add(faStarOutline);
library.add(faTimeline);
library.add(faCircleDot);

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });
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
app.component('p-dropdown', Select);
app.component('p-datatable', DataTable);
app.component('p-column', Column);
app.component('p-columnGroup', ColumnGroup);
app.component('p-row', Row);
app.component('p-multiSelect', MultiSelect);
app.component('p-inputText', InputText);
app.component('p-calendar', DatePicker);
app.component('p-inputnumber', InputNumber);
app.component('p-tag', Tag);
app.component('p-progressbar', ProgressBar);
app.component('p-slider', Slider);
app.component('p-iconField', IconField);
app.component('p-inputIcon', InputIcon);
app.component('p-carousel', Carousel);
app.component('p-galleria', Galleria);
app.component('p-chart', Chart);
app.component('p-dialog', Dialog);
app.component('p-timeline', Timeline);
app.directive('animateonscroll', AnimateOnScroll);
app.component('p-speedDial', SpeedDial);

app.mount("#app");
