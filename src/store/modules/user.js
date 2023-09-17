import { loginAPI } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  // 数据状态 响应式 data
  state: {
    // 优先从本地取
    token: getToken() || ''
  },
  // 同步修改 Vuex架构中 有且只有一种提交mutation
  mutations: {
    setToken(state, newToken) {
      // 存入vuex
      state.token = newToken
      // cookies也存一份
      setToken(newToken)
    },
    clearUserInfo(state) {
      state.token = ''
      removeToken()
    }
  },
  // 异步 接口请求 + 提交mutation
  actions: {
    async asyncLogin(ctx, { username, password }) {
      // 1.调用登录接口
      const res = await loginAPI({ username, password })
      // 2.提交mutations
      ctx.commit('setToken', res.data.token)
    }
  }
}
