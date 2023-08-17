import request from '@/utils/request'

/**
 *
 * @returns 获取员工简单列表
 */
export const getSimpleUserListApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 * @param {*} page
 * @param {*} size
 * @returns
 */
export const getUserListApi = (page, size) => {
  return request({
    url: 'sys/user',
    params: {
      page,
      size
    }
  })
}
