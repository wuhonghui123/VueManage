import Login from "@/views/Login/Login";
// import Index from "@/views/index"
import UserList from "@/views/System/UserList"
import {createRouter, createWebHistory} from "vue-router";
import User from "@/views/System/User";
import Role from "@/views/System/Role";
import MainContent from "@/views/Login/MainContent";
import Main from "@/views/Login/Main";
import Admin from "@/views/System/Admin";
import WaresList from "@/views/Wares/WaresList";
import WaresAdd from "@/views/Wares/WaresAdd";
import WaresClass from "@/views/Wares/WaresClass";
import WaresType from "@/views/Wares/WaresType";
import OrderList from "@/views/Order/OrderList";
import OrderSetting from "@/views/Order/OrderSetting";
import Menu from "@/views/System/Menu";
import CommentList from "@/views/Comment/CommentList";
import OrderDetails from "@/views/Order/OrderDetails";
import OrderShipped from "@/views/Order/OrderShipped";

const Index = () => import('../views/Login')



const routes=[
    {
        path:"/",
        name:'Login',
        component:Login
    },
    {
        path: '/index',
        name: 'Index',
        meta: {
            name: '首页'
        },
        component: Index,
        redirect: '/index/mainContent',
        children: [
            {
                path: 'mainContent',
                name: 'MainContent',
                meta: {
                    name: 'MainContent'
                },
                component: MainContent,
                redirect: {path: '/index/mainContent/main'},
                children: [
                    {
                        path: 'main',
                        name: 'Main',
                        meta: {
                            name: 'main'
                        },
                        component: Main
                    },
                    {
                        path: 'user',
                        name: 'User',
                        meta: {
                            name: '用户'
                        },
                        component: User
                    },
                    {
                        path: 'role',
                        name: 'Role',
                        meta: {
                            name: '角色'
                        },
                        component: Role
                    },
                    {
                        path: 'menu',
                        name: 'Menu',
                        meta: {
                            name: '菜单'
                        },
                        component: Menu
                    },
                    {
                        path: 'admin',
                        name: 'Admin',
                        meta: {
                            name: '管理员'
                        },
                        component: Admin
                    },

                    {
                        path: 'userlist',
                        name: 'UserList',
                        meta: {
                        name: '用户列表'
                    },
                    component: UserList
                    },
                    {
                        path: 'waresList',
                        name: 'WaresList',
                        meta: {
                            name: '商品列表'
                        },
                        component: WaresList
                    },
                    {
                        path: 'waresAdd',
                        name: 'WaresAdd',
                        meta: {
                            name: '添加商品'
                        },
                        component: WaresAdd
                    },
                    {
                        path: 'waresClass',
                        name: 'WaresClass',
                        meta: {
                            name: '商品分类'
                        },
                        component: WaresClass
                    },
                    {
                        path: 'waresType',
                        name: 'WaresType',
                        meta: {
                            name: '商品类型'
                        },
                        component: WaresType
                    },
                    {
                        path: 'orderList',
                        name: 'OrderList',
                        meta: {
                            name: '订单列表'
                        },
                        component: OrderList
                    },
                    {
                        path: 'orderSetting',
                        name: 'OrderSetting',
                        meta: {
                            name: '订单设置'
                        },
                        component: OrderSetting
                    },
                    {
                        path: 'commentList',
                        name: 'CommentList',
                        meta: {
                            name: '评论列表'
                        },
                        component: CommentList
                    },
                    {
                        path: 'orderDetails',
                        name: 'OrderDetails',
                        meta: {
                            name: '订单详情'
                        },
                        component: OrderDetails
                    },
                    {
                        path: 'orderShipped',
                        name: 'OrderShipped',
                        meta: {
                            name: '订单发货'
                        },
                        component: OrderShipped
                    }
                ]
            }
        ]
    }
]

const router=createRouter({
    history:createWebHistory(),routes
})
export {router}
