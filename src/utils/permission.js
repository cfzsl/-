import router from '../router'

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
