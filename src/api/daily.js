import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/daily/list',
    method: 'get',
    params
  })
}

export function createDaily(data) {
  return request({
    url: '/vue-admin-template/daily/create',
    method: 'post',
    data
  })
}

export function updateDaily(data) {
  return request({
    url: '/vue-admin-template/daily/update',
    method: 'post',
    data
  })
}
