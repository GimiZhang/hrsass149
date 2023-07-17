import request from '@/utils/request'

export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
