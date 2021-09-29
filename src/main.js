import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/element-variables.scss';
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store'
import '@/libs/global.js'
// import './mock.js'

import ElementUI from 'element-ui';
import {
  Message
} from 'element-ui';
import MyPagination from '@/components/MyPagination'
import MyInput from '@/components/MyInput'
import BackTip from '@/components/BackTip'
import Table from "@/components/Table"
import "@/assets/iconfont/iconfont.css"; //引入阿里矢量图标库
//
import '@/styles/common.scss'
Vue.component('Table', Table)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('MyPagination', MyPagination);
Vue.component('BackTip', BackTip);
Vue.component('MyInput', MyInput);
//
//路由导航守卫
router.beforeEach((to, from, next) => {
  //to 要去的路由配置
  //from 当前的路由配置
  //next 一定要调用，让to的路由配置继续生效，比如如果去登陆直接next(),否则判断token是否存在，如果存在就next()

  if (to.path === '/login') return next(); //使用return，不需要写else

  //判断其他页面是否有token
  const token = store.state.userInfo.Token;
  //存在继续往后走
  if (token) return next();


  // this.$router.push({name:'login'}) #没有this,无法使用
  Message.warning('未登录或token失效，请先登录！')
  router.push({
    name: 'login'
  })
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')