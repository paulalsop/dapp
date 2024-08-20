import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/reset.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import i18n from "@/lang/index";
import VueHashCalendar from 'vue3-hash-calendar';
import 'vue3-hash-calendar/es/index.css';
createApp(App).use(VueHashCalendar).use(i18n).use(store).use(router).use(Vant).mount('#app')
