import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import request from '@/utils/request'
// import { imageerror } from '@/directives' // 单个导入
import * as directives from '@/directives' // 批量导入
import App from './App'
import store from './store'
import router from './router'
import components from './components/index'

import '@/icons' // icon
import '@/permission' // permission control
Vue.use(components)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 挂载request实例
Vue.prototype.$request = request

// 自定义指令 封装在deirectives文件夹中
// Vue.directive('imgerror', imageerror) // 单个导入使用
// 注册指令有两种方式， forin 和 object.keys（）
// for (const key in directives) {
//   Vue.directive(key, directives[key])
// }

// 这是第二种注册方式
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
console.log(process.env)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
