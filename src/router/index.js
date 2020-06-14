// @babel/plugin-syntax-dynamic-import  安装插件
import Vue from 'vue'
import Router from 'vue-router'


// 导入后台主页组件
const Home = () => import(/* webpackChunkName: "login_home" */ '@/components/Home')
// 导入登陆主页组件
const Login = () => import(/* webpackChunkName: "login_home" */ '@/components/Login')


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
    // redirect: '/welcome',
    // children: [
    //   { path: '/welcome', component: Welcome },
    //   { path: '/users', component: UserList },
    //   { path: '/rights', component: Rights },
    //   { path: '/roles', component: Roles },
    //   { path: '/categories', component: Cate },
    //   { path: '/params', component: Params },
    //   { path: '/goods', component: GoodsList },
    //   { path: '/goods/add', component: GoodsAdd },
    //   { path: '/orders', component: OrderList },
    //   { path: '/report', component: Report }
    // ]
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