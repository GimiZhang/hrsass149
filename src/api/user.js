import request from '@/utils/request'

export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取用户基本信息
 * @param {用户id} id
 * @returns
 */
export const getBaseUserInfoApi = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
