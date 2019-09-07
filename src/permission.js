import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
