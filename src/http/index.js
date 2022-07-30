// 导入所有接口
import api from './api'

export default {
    install: (app) => {
        app.config.globalProperties.$api = api;
    }
}