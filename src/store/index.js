import {createStore} from "vuex";
import menu from "@/store/modules/menu";
import vuexAlong from "vuex-along";
import user from "@/store/modules/user";
import orderList from "./modules/orderList";
import searchOrder from "./modules/searchOrder";

const store = createStore({
    modules:{
        menu,
        user,
        orderList,
        searchOrder
    },
    plugins: [vuexAlong({
        name: ['navTree','OrderList','SearchOrder'],
        local: {
            navTree: ["menu.navTree"],
            OrderList: ["orderList.OrderList"],
            SearchOrder:["searchOrder.SearchOrder"]
        }
    })]
})
export default store
