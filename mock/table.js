const Mock = require('mockjs')
const axios = require('axios')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    pageviews: '@integer(300, 5000)'
  }]
})

const { TB_BASE_URL } = require('./utils')

const getDevices = async(tbtoken) => {
  try {
    const res = await axios.post(TB_BASE_URL + '/api/entitiesQuery/find', {
      entityFilter: {
        type: 'entityName',
        entityType: 'DEVICE',
        entityNameFilter: ''
      },
      pageLink: {
        page: 0,
        pageSize: 100
      },
      direction: 'ASC'
    }, {
      headers: { Authorization: 'Bearer ' + tbtoken }
    })
    return res.data.data
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 0,
          items: []
        }
      }
    }
  },
  {
    url: '/api/device/all',
    type: 'get',
    response: config => {
      // console.log(config.headers['x-tb-token'])
      const items = getDevices(config.headers['x-tb-token'])
      // console.log(items)
      return {
        code: 20000,
        data: {
          total: 0,
          items: []
        }
      }
    }
  }
]
