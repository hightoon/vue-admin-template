// import { logout, getInfo } from '@/api/user'
import { login, logout, getInfo } from '@/api/tbuser'
import { getToken, setToken, removeToken,
  setTBToken, getTBToken, removeTBToken,
  setTBRefreshToken, getTBRefreshToken, removeTBRefreshToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    tbToken: '',
    refreshToken: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_TBTOKEN: (state, tbtoken) => {
    state.tbToken = tbtoken
  },
  SET_REFRESH: (state, refreshtoken) => {
    state.refreshToken = refreshtoken
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(username + password)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_TBTOKEN', data.token)
        commit('SET_REFRESH', data.refreshToken)
        commit('SET_NAME', username)
        setToken(data.token)
        setTBToken(data.token)
        setTBRefreshToken(data.refreshToken)
        resolve()
      }).catch(error => {
        console.log('failed')
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getTBToken()).then(response => {
        const { data } = response
        console.log(data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name } = data

        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(getTBToken()).then(() => {
        removeToken() // must remove  token  first
        removeTBToken()
        removeTBRefreshToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeTBToken()
      removeTBRefreshToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

