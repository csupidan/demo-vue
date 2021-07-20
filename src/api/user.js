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

export function fetchList(data) {
  return bootrequest({
    url: '/users?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&query=' + data.query,
    method: 'get'
  })
}

export function fetchUser(id) {
  return bootrequest({
    url: '/user/' + id,
    method: 'get'
  })
}

export function updateUser(data, id) {
  return bootrequest({
    url: '/user/' + id,
    method: 'patch',
    data
  })
}

export function deleteUser(id) {
  return bootrequest({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function updatPassword(id, data) {
  return bootrequest({
    url: '/user/' + id + '/password',
    method: 'put',
    data
  })
}
export function creatUser(data) {
  return bootrequest({
    url: '/users',
    method: 'post',
    data
  })
}
