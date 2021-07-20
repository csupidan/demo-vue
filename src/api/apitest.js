import request from '@/utils/request'

export function postuser(params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}
