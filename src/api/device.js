import request from '@/utils/request'

export function getList(params) {
  console.log('getList in device')
  return request({
    url: '/api/device/all',
    method: 'get',
    params
  })
}
