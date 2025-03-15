import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/city/list',
    method: 'get',
    params
  })
}
