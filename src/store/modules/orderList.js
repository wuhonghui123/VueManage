
export default {
    state: {
        // 全局属性
        // 如果没有模块化，很多模块的属性，都在这里声明
        OrderList: []
    },
    // 同步操作赋值
    mutations: {
        // 赋值操作
        setOrderList(state, OrderList) {
            state.OrderList = OrderList;
            console.log("给OrderList赋值：", OrderList)
        }
    },
    actions: {
        /*
        如果有异步操作，网络请求某个数据后，再进行赋值
        异步：同时进行，不用等待；
         */
    },
    getters: {
        getOrderList(state) {
            return state.OrderList
        },


    }
}