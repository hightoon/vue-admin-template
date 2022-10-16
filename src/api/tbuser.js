import request from '@/utils/request'
import axios from 'axios'

const TB_BASE_URL = 'http://120.55.92.168:8080'

export function login(data) {
  return axios.post(TB_BASE_URL + '/api/auth/login', data)
}

export function getInfo(token) {
  console.log(token)
  return axios.get(TB_BASE_URL + '/api/auth/user', { headers: { Authorization: 'Bearer ' + token }})
}

export function logout(token) {
  console.log(token)
  return axios.post(TB_BASE_URL + '/api/auth/logout', {}, { headers: { Authorization: 'Bearer ' + token }})
}
