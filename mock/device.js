const axios = require('axios')

const { TB_BASE_URL } = require('./utils')

const getDevices = async() => {
  try {
    const res = await axios.post(TB_BASE_URL + '/api/entitiesQuery/find', {
      direction: 'ASC'
    })
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = [
  getDevices
]
