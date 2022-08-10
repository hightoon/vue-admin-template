const axios = require('axios')
const { TB_BASE_URL } = require('./utils')

const tokens = {
  admin: {
    token: 'admin-token',
    tbtoken: ''
  },
  editor: {
    token: 'editor-token'
  },
  fps: {
    token: 'admin-token',
    tbtoken: '',
    tbrefresh: ''
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super_Admin',
    tbtoken: ''
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

function loginTB(cb) {
  axios.post(TB_BASE_URL + '/api/auth/login', {
    username: 'tenant@thingsboard.org',
    password: 'tenant'
  }).then(function(response) {
    console.log(response.data)
  }).catch(function(error) {
    console.log(error)
  })
}

const loginTBAsync = async () => {
  try {
    const res = await axios.post(TB_BASE_URL + '/api/auth/login', {
      username: 'tenant@thingsboard.org',
      password: 'tenant'
    })
    tokens.fps.tbtoken = res.data.token
    tokens.fps.refreshToken = res.data.refreshToken
  } catch (err) {
    console.log(err)
  }
}

loginTBAsync()

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      if (config.body.username !== 'fps' || config.body.password !== 'fps@qq.com') {
        return {
          code: 60204,
          message: '用户名或密码错!'
        }
      }
      var token = tokens[config.body.username]
      loginTB(function(data) {
        token.tbtoken = data.token
        token.tbrefresh = data.refreshToken
        users[token.token].tbtoken = token.tbtoken
        console.log(data)
      })
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]
