import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router";
import api from "@/http/index";
import store from "@/store/index"
import 'element-ui/lib/theme-chalk/index.css'
import element from "element-plus"

import {toRaw} from '@vue/reactivity';

createApp(App).use(api).use(router).use(store).use(toRaw).use(element).mount('#app')
