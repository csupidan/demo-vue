import request from '@/utils/request'
import bootrequest from '@/utils/bootrequest'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: 'https://www.fastmock.site/mock/c5557ed22ad6c9b448bcd327aa5ff087/cy58/api/user',
    // url: 'https://www.fastmock.site/mock/c5557ed22ad6c9b448bcd327aa5ff087/cy58/api/user2',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: 'https://www.fastmock.site/mock/c5557ed22ad6c9b448bcd327aa5ff087/cy58/api/getinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getCurrentUserInfo() {
  return bootrequest({
    url: '/user/@self',
    method: 'get'
  })
}
