import Cookies from 'js-cookie'

const TokenKey = 'vue_demo_token'
const Session = 'SESSION'

export function getToken() {
  return Cookies.get(Session)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}