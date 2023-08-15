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
