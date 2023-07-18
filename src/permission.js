import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
// 发生页面跳转，都走beforEach
// to: 去哪个页面
// from: 从哪个页面来
// next: 正常放行跳转
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  // 有token的情况
  if (token) {
    if (to.path === '/login') {
      // 如果是从登陆页面过来 跳转到主页面
      next('/')
      NProgress.done()
    } else {
      // 如果有token，跳转其他页面，正常放行

      if (Object.keys(store.state.user.userInfo).length <= 0) {
        store.dispatch('user/getUserInfo').then((res) => {
          next()
        })
      } else {
        next()
      }

      NProgress.done()
    }
  } else {
    // 没有token的情况，如果是白名单 正常放行，否则跳转到登陆页面
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
