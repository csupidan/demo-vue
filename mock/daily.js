const Mock = require('mockjs')

const List = []
const count = 78
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      employee: '@cname',
      team: '开发中心',
      workdata: "@now('yyyy-MM-dd')",
      dailywork: '@cparagraph(1, 4)',
      todolist: '@cparagraph(2, 3)',
      creatime: "@now('yyyy-MM-dd HH:mm:ss')",
      operator: 'luojianan'
    })
  )
}

module.exports = [
  {
    url: '/vue-admin-template/daily/list',
    type: 'get',
    response: config => {
      const { employee, type, title, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        // if (type && item.type !== type) return false
        if (employee && item.employee.indexOf(employee) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-admin-template/daily/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-admin-template/daily/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
