import Cookie from 'js-cookie'
import store from '../store'

export default function (to, from, next) {
  const allowedPath = ['/', '/regist', '/login', '/company-regist', '/find-password',
    '/job-list', '/about', '/contact', '/questions']

  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (allowedPath.indexOf(to.path) !== -1) {
    next()
  } else {
    if (Cookie.get('userId') || store.state.user.userId) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
}
