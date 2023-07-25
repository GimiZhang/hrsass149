import { loginApi, getUserInfoApi, getBaseUserInfoApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken() || '',
  userInfo: {}
}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
    // setUserInfo(newUserInfo) // cookie中不需要保存用户信息，只需要保存到vuex中即可
  },

  clearToken(state) {
    state.token = ''
    removeToken()
  },

  clearUserInfo(state) {
    state.userInfo = {}
  }
}

const getters = {}

const actions = {
  async login(context, data) {
    const res = await loginApi(data)
    const token = res.data
    context.commit('setToken', token)
  },
  async getUserInfo({ commit }) {
    const { data } = await getUserInfoApi()
    const { data: data2 } = await getBaseUserInfoApi(data.userId)
    const baseData = {
      ...data,
      ...data2
    }
    commit('setUserInfo', baseData)
    // .catch((error) => {
    //   reject(error)
    // })
    // return new Promise((resolve, reject) => {

    // })
  },
  loginOut({ commit }) {
    commit('clearToken')
    commit('clearUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
