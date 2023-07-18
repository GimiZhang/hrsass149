import Cookies from 'js-cookie'

const TokenKey = 'hrsaaa-149'
const UserInfoKey = 'hrsaaa-userInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(UserInfoKey)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfoKey, userInfo)
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
