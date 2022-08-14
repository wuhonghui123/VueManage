
export default {
    state: {
        // 全局属性
        // 如果没有模块化，很多模块的属性，都在这里声明
        SearchOrder: [],
        OrderUserList:[],
        type:''
    },
    // 同步操作赋值
    mutations: {
        // 赋值操作
        setSearchOrder(state, SearchOrder) {
            state.SearchOrder = SearchOrder;
            console.log("给SearchOrder赋值：", SearchOrder)
        },
        setOrderType(state, type) {
            state.type = type;
            console.log("给SearchOrder赋值：", type)
        }
    },
    actions: {
        /*
        如果有异步操作，网络请求某个数据后，再进行赋值
        异步：同时进行，不用等待；
         */
    },
    getters: {
        getSearchOrder(state) {
            return state.SearchOrder
        },
        getOrderType(state) {
            return state.type
        }
    }
}