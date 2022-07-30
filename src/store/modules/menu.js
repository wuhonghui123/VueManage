
export default {
    state: {
        // 全局属性
        // 如果没有模块化，很多模块的属性，都在这里声明
        navTree: []
    },
    // 同步操作赋值
    mutations: {
        // 赋值操作
        setNavTree(state, navTree) {
            state.navTree = navTree;
            console.log("给navTree赋值：", navTree)
        }
    },
    actions: {
        /*
        如果有异步操作，网络请求某个数据后，再进行赋值
        异步：同时进行，不用等待；
         */
        setNavTree(ctx, payload) {
            console.log('载荷：', payload.data);
            console.log('type: ', payload.type)
            ctx.commit(payload.type, payload.data);//调用mutations的setNavTree
        }
    },
    getters: {
        getNavTree(state) {
            return state.navTree
        }
    }
}