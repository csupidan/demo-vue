import request from '@/utils/crudRequest'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}

export function add(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/user/' + ids,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/user/' + data.id,
    method: 'patch',
    data
  })
}

export function editUser(data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data
  })
}

export function updatePass(id, data) {
  return request({
    url: '/user/' + id + '/password',
    method: 'put',
    data
  })
}

export default { add, edit, del }
