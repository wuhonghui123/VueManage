import { createApp } from 'vue'
import App from './App.vue'
import {router} from "@/router";
import api from "@/http/index";
import store from "@/store/index"
import ElementPlus from 'element-plus'  //引入element-plus库
// import VForm3 from 'vform3-builds'  //引入VForm3库
import 'element-plus/dist/index.css'  //引入element-plus样式
// import 'vform3-builds/dist/designer.style.css'  //引入VForm3样式
import {toRaw} from '@vue/reactivity';



createApp(App).use(api).use(router).use(store).use(toRaw).use(ElementPlus).mount('#app')
