// @babel/plugin-syntax-dynamic-import  安装插件
import Vue from 'vue'
import Router from 'vue-router'


// 导入 登录组件
const Login = () => import(/* webpackChunkName: "login_home" */ '@/components/Login')
// 导入后台主页组件
const Home = () => import(/* webpackChunkName: "login_home" */ '@/components/Home')
// 导入 Welcome 组件
const Welcome = () => import(/* webpackChunkName: "login_home" */ '@/components/Welcome')
// 导入 用户列表组件
const UserList = () => import(/* webpackChunkName: "userlist" */ '@/components/user/User')

// 导入 权限列表组件
const Rights = () => import(/* webpackChunkName: "power" */ '@/components/power/Rights')
// 导入 角色列表组件
const Roles = () => import(/* webpackChunkName: "power" */ '@/components/power/Roles')

// 导入 商品分类组件
const Cate = () => import(/* webpackChunkName: "goods" */ '@/components/goods/Cate')
// 导入 商品参数列表组件
const Params = () => import(/* webpackChunkName: "goods" */ '@/components/params/Params')
// 导入 商品列表组件
const GoodsList = () => import(/* webpackChunkName: "goods" */ '@/components/goods/List')
// 导入 商品添加组件
const GoodsAdd = () => import(/* webpackChunkName: "goods" */ '@/components/goods/Add')

// 导入 订单列表组件
const OrderList = () => import(/* webpackChunkName: "order_report" */ '@/components/order/Order')
// 导入报表组件
const Report = () => import(/* webpackChunkName: "order_report" */ '@/components/report/Report')

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'   //设置默认主页'/'的跳转
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: UserList },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: GoodsAdd },
      { path: '/orders', component: OrderList },
      { path: '/report', component: Report }
    ]
  }
  ]
})

// //挂载路由导航守卫，控制访问权限
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 从哪个路几个过来
//   // next 是一个函数，表示放行

//   //首先判断将要访问 登陆页面则放行，否则就是要访问其他页面，则进行守卫
//   if (to.path === '/login') return next();
//   //从 sessionStorage 中获取保存的 token 值
//   const tokenStr = window.sessionStorage.getItem('token')
//   //没有 token,强制跳转到登录页
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router