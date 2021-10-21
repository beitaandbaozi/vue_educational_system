import Cookies from 'js-cookie'
const timeKey =  'beita-timestamp-key'
const TokenKey = 'beita-token'

// 获取时间戳
export function getTimeStamp(){
    return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp(){
    Cookies.set(timeKey,Date.now())
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
