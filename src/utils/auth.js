import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TBKey = 'tb_auth_token'
const TBRefreshKey = 'tb_refresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTBToken(tbToken) {
  return Cookies.set(TBKey, tbToken)
}

export function getTBToken() {
  return Cookies.get(TBKey)
}

export function removeTBToken() {
  return Cookies.remove(TBKey)
}

export function getTBRefreshToken() {
  return Cookies.get(TBRefreshKey)
}

export function setTBRefreshToken(refreshToken) {
  return Cookies.set(TBRefreshKey, refreshToken)
}

export function removeTBRefreshToken() {
  return Cookies.remove(TBRefreshKey)
}
